import { Subject, EMPTY, Observable, interval, BehaviorSubject } from 'rxjs';
import { switchMap, scan, takeWhile, map, timeInterval, finalize, endWith, takeUntil, tap } from 'rxjs/operators';

export class CountdownTimer {

    duration: number;
    timer$: Observable<number>;
    private complete = new Subject<void>();
    private stateSubject = new BehaviorSubject<'running' | 'paused' | 'reset'>('reset');
    private pause$: Subject<boolean>;
    private interval$: Observable<number>;
    private hasRun = false;
    private timeSubject: BehaviorSubject<number>;
    private reset = new Subject<void>();

    constructor(duration: number) {
        this.duration = duration;
        this.pause$ = new Subject<boolean>();
        this.timeSubject = new BehaviorSubject(duration);

        this.interval$ = interval(100).pipe(
            timeInterval(),
            map(value => -value.interval)
        );

        this.stop();
    }

    start(): void {
        this.hasRun = true;
        this.pause$.next(false);
        this.stateSubject.next('running');
    }

    pause(): void {
        this.pause$.next(true);
        this.stateSubject.next('paused');
    }

    stop(): void {
        this.reset.next();
        // this.pause$.complete();
        // this.pause$ = new Subject<boolean>();
        this.pause$.next(true);
        this.timeSubject.next(this.duration);
        this.timer$ = this.pause$.asObservable().pipe(
            switchMap(pause => pause ? EMPTY : this.interval$),
            scan((acc, curr) => (curr ? curr + acc : acc), this.duration),
            takeWhile(timeLeft => timeLeft >= 0, true),
            endWith(0),
            finalize(() => {
                if (this.hasRun) {
                    this.complete.next();
                }
                this.hasRun = false;
            })
        );

        this.timer$
            .pipe(takeUntil(this.reset))
            .subscribe((val) => this.timeSubject.next(val));
        this.stateSubject.next('reset');

    }

    getTimeObservable(): Observable<number> {
        return this.timeSubject.asObservable();
    }

    getCompleteObservable(): Observable<void> {
        return this.complete.asObservable();
    }

    setDuration(duration: number): void {
        this.duration = duration;
        if (!this.hasRun) {
            this.stop();
        }
    }

    getState(): Observable<'running' | 'paused' | 'reset'> {
        return this.stateSubject.asObservable();
    }

}
