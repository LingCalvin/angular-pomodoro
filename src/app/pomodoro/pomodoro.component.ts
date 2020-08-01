import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CountdownTimer } from '../countdown-timer';
import { SessionService } from '../session.service';
import { SessionSetting } from '../session-setting.enum';
import { NotificationService } from '../notification.service';
import { SettingsService } from '../settings.service';
import { Setting } from '../setting.enum';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  workTimer: CountdownTimer;
  shortBreakTimer: CountdownTimer;
  longBreakTimer: CountdownTimer;
  activeTabIndex: number | null;

  constructor(
    private notifier: NotificationService,
    private session: SessionService,
    private settings: SettingsService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.handleWorkTimerComplete = this.handleWorkTimerComplete.bind(this);
    this.handleShortBreakTimerComplete = this.handleShortBreakTimerComplete.bind(this);
    this.handleLongBreakTimerComplete = this.handleShortBreakTimerComplete.bind(this);
  }

  ngOnInit(): void {
    this.workTimer = new CountdownTimer(this.settings.get(Setting.WorkLength));
    this.workTimer.complete.subscribe(this.handleWorkTimerComplete);

    this.shortBreakTimer = new CountdownTimer(this.settings.get(Setting.ShortBreakLength));
    this.shortBreakTimer.complete.subscribe(this.handleShortBreakTimerComplete);

    this.longBreakTimer = new CountdownTimer(this.settings.get(Setting.LongBreakLength));
    this.longBreakTimer.complete.subscribe(this.handleLongBreakTimerComplete);
  }

  handleWorkTimerComplete(): void {
    this.notifier.sendNotification('Work session completed');
    this.workTimer.stop();
    this.incrementPomodoroCount();
    const numPomodoros = this.session.get(SessionSetting.NumberOfPomodoros, 0);
    if (numPomodoros % 4 === 0) {
      this.setLongBreakTabActive();
    } else {
      this.setShortBreakTabActive();
    }
  }

  handleShortBreakTimerComplete(): void {
    this.notifier.sendNotification('Break is over');
    this.shortBreakTimer.stop();
    this.setWorkTabActive();
  }

  handleLongBreakTimerComplete(): void {
    this.notifier.sendNotification('Break is over');
    this.longBreakTimer.stop();
    this.setWorkTabActive();
  }

  incrementPomodoroCount(): void {
    const pomodoros = this.session.get(SessionSetting.NumberOfPomodoros, 0) + 1;
    this.session.set(SessionSetting.NumberOfPomodoros, pomodoros);
  }

  setWorkTabActive(): void {
    this.activeTabIndex = 0;
    this.changeDetector.detectChanges();
  }

  setShortBreakTabActive(): void {
    this.activeTabIndex = 1;
    this.changeDetector.detectChanges();
  }

  setLongBreakTabActive(): void {
    this.activeTabIndex = 2;
    this.changeDetector.detectChanges();
  }

}
