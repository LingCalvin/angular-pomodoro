import { Subject, EMPTY, Observable, interval } from 'rxjs';
import { switchMap, scan, takeWhile, map, timeInterval, finalize, endWith } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

export class CountdownTimer {

    duration: number;
    timer$: Observable<number>;
    complete = new EventEmitter<void>();
    private pause$: Subject<boolean>;
    private interval$: Observable<number>;
    private hasRun = false;

    constructor(duration: number) {
        this.duration = duration;
        this.pause$ = new Subject<boolean>();

        this.interval$ = interval(100).pipe(
            timeInterval(),
            map(value => -value.interval)
        );

        this.stop();
    }

    start(): void {
        this.hasRun = true;
        this.pause$.next(false);
    }

    pause(): void {
        this.pause$.next(true);
    }

    stop(): void {
        this.timer$ = this.pause$.asObservable().pipe(
            switchMap(pause => pause ? EMPTY : this.interval$),
            scan((acc, curr) => (curr ? curr + acc : acc), this.duration),
            takeWhile(timeLeft => timeLeft >= 0, true),
            endWith(0),
            finalize(() => {
                if (this.hasRun) {
                    this.complete.emit();
                }
                this.hasRun = false;
            })
        );
    }

    setDuration(duration: number): void {
        this.duration = duration;
    }

}
