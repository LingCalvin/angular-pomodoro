import { Component, OnInit } from '@angular/core';
import { CountdownTimer } from '../countdown-timer';
import { SessionService } from '../session.service';
import { SessionSetting } from '../session-setting.enum';
import { toMilliseconds } from '../to-milliseconds';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  workTimer: CountdownTimer;
  shortBreakTimer: CountdownTimer;
  longBreakTimer: CountdownTimer;
  activeTabIndex = 0;

  constructor(private session: SessionService) {
    this.handleWorkTimerComplete = this.handleWorkTimerComplete.bind(this);
    this.handleShortBreakTimerComplete = this.handleShortBreakTimerComplete.bind(this);
    this.handleLongBreakTimerComplete = this.handleShortBreakTimerComplete.bind(this);
  }

  ngOnInit(): void {
    this.workTimer = new CountdownTimer(toMilliseconds({ minutes: 25 }));
    this.workTimer.complete.subscribe(this.handleWorkTimerComplete);

    this.shortBreakTimer = new CountdownTimer(toMilliseconds({ minutes: 5 }));
    this.shortBreakTimer.complete.subscribe(this.handleShortBreakTimerComplete);

    this.longBreakTimer = new CountdownTimer(toMilliseconds({ minutes: 15 }));
    this.longBreakTimer.complete.subscribe(this.handleLongBreakTimerComplete);
  }

  handleWorkTimerComplete(): void {
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
    this.shortBreakTimer.stop();
    this.setWorkTabActive();
  }

  handleLongBreakTimerComplete(): void {
    this.longBreakTimer.stop();
    this.setWorkTabActive();
  }

  incrementPomodoroCount(): void {
    const pomodoros = this.session.get(SessionSetting.NumberOfPomodoros, 0) + 1;
    this.session.set(SessionSetting.NumberOfPomodoros, pomodoros);
  }

  setWorkTabActive(): void { this.activeTabIndex = 0; }

  setShortBreakTabActive(): void { this.activeTabIndex = 1; }

  setLongBreakTabActive(): void { this.activeTabIndex = 2; }

}
