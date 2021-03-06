import { Injectable, OnDestroy } from '@angular/core';
import { SettingsService } from './settings.service';
import { Setting } from './setting.enum';
import { NotificationService } from './notification.service';
import { SessionService } from './session.service';
import { SessionSetting } from './session-setting.enum';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Timer } from './timer';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService implements OnDestroy {

  workTimer: Timer;
  shortBreakTimer: Timer;
  longBreakTimer: Timer;
  stateSubject = new BehaviorSubject<'work' | 'long' | 'short'>('work');
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private notifier: NotificationService,
    private session: SessionService,
    private settings: SettingsService
  ) {
    this.onWorkTimerComplete = this.onWorkTimerComplete.bind(this);
    this.onShortBreakTimerComplete = this.onShortBreakTimerComplete.bind(this);
    this.onLongBreakTimerComplete = this.onLongBreakTimerComplete.bind(this);

    this.workTimer = new Timer(this.settings.get(Setting.WorkLength));
    this.shortBreakTimer = new Timer(this.settings.get(Setting.ShortBreakLength));
    this.longBreakTimer = new Timer(this.settings.get(Setting.LongBreakLength));


    const compObs$ = [this.workTimer, this.shortBreakTimer, this.longBreakTimer]
      .map((timer) => {
        return merge(timer.getCompletedObservable(), timer.getInterruptedObservable())
          .pipe(takeUntil(this.ngUnsubscribe));
      });

    compObs$[0].subscribe(this.onWorkTimerComplete);
    compObs$[1].subscribe(this.onShortBreakTimerComplete);
    compObs$[2].subscribe(this.onLongBreakTimerComplete);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onWorkTimerComplete(): void {
    this.notifier.sendIfDesired('Work session completed');
    this.workTimer.reset();
    this.incrementPomodoroCount();
    const numPomodoros = this.session.get(SessionSetting.NumberOfPomodoros, 0);
    if (numPomodoros % 4 === 0) {
      this.stateSubject.next('long');
    } else {
      this.stateSubject.next('short');
    }
  }

  onShortBreakTimerComplete(): void {
    this.notifier.sendIfDesired('Break is over');
    this.shortBreakTimer.reset();
    this.stateSubject.next('work');
  }

  onLongBreakTimerComplete(): void {
    this.notifier.sendIfDesired('Break is over');
    this.longBreakTimer.reset();
    this.stateSubject.next('work');
  }

  incrementPomodoroCount(): void {
    const pomodoros = this.session.get(SessionSetting.NumberOfPomodoros, 0) + 1;
    this.session.set(SessionSetting.NumberOfPomodoros, pomodoros);
  }

  getState(): Observable<'work' | 'short' | 'long'> {
    return this.stateSubject.asObservable();
  }

  reloadSettings(): void {
    this.workTimer.setDuration(this.settings.get(Setting.WorkLength));
    this.shortBreakTimer.setDuration(this.settings.get(Setting.ShortBreakLength));
    this.longBreakTimer.setDuration(this.settings.get(Setting.LongBreakLength));
  }

}
