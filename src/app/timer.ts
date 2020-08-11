import { Observable, interval, BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { timeInterval, map, switchMap, scan, endWith, takeWhile, tap, finalize, takeUntil, share } from 'rxjs/operators';

export type state = 'running' | 'paused' | 'reset' | 'ready';


export class Timer {


  duration: number;
  private interval$: Observable<number>;
  private run$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private timer$: Observable<number>;
  private resetSubject = new Subject<void>();
  private stateSubject = new BehaviorSubject<state>('paused');
  private completedSubject = new Subject<void>();
  private interruptedSubject = new Subject<void>();
  private timeLeftSubject: BehaviorSubject<number>;
  private ngUnsubscribe = new Subject<void>();

  constructor(duration: number) {
    this.duration = duration;
    this.timeLeftSubject = new BehaviorSubject(this.duration);
    this.interval$ = interval(100).pipe(
      timeInterval(),
      map(value => -value.interval)
    );

    this.timer$ = this.resetSubject.pipe(switchMap(() => this.generateTimer()));
    this.timer$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(timeLeft => this.timeLeftSubject.next(timeLeft));
    this.reset();
  }

  start(): void {
    if (this.stateSubject.value === 'ready'
      || this.stateSubject.value === 'paused') {
      this.run$.next(true);
      this.stateSubject.next('running');
    }
  }

  pause(): void {
    if (this.stateSubject.value === 'running') {
      this.run$.next(false);
      this.stateSubject.next('paused');
    }
  }

  reset(): void {
    const timerState = this.stateSubject.value;
    if (timerState !== 'reset' && timerState !== 'ready') {
      this.stateSubject.next('reset');
      this.run$.next(false);
      this.resetSubject.next();
      this.stateSubject.next('ready');
    }
  }

  setDuration(duration: number): void {
    this.duration = duration;
    if (this.stateSubject.value === 'ready') {
      this.timeLeftSubject.next(this.duration);
    }
  }

  getCompletedObservable(): Observable<void> {
    return this.completedSubject.asObservable();
  }

  getInterruptedObservable(): Observable<void> {
    return this.interruptedSubject.asObservable();
  }

  getTimeLeftObservable(): Observable<number> {
    return this.timeLeftSubject.asObservable();
  }

  getStateObservable(): Observable<state> {
    return this.stateSubject.asObservable();
  }

  cleanup(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  private generateTimer(): Observable<number> {
    return this.run$.asObservable().pipe(
      switchMap(run => run ? this.interval$ : EMPTY),
      scan((acc, curr) => (curr ? curr + acc : acc), this.duration),
      takeWhile(timeLeft => timeLeft >= 0, true),
      endWith(0),
      finalize(() => {
        if (this.stateSubject.value === 'running') {
          this.completedSubject.next();
        } else {
          this.interruptedSubject.next();
        }
        this.timeLeftSubject.next(this.duration);
      })
    );
  }
}
