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
    } else {
    }
  }

  handleShortBreakTimerComplete(): void {
    this.shortBreakTimer.stop();
  }

  handleLongBreakTimerComplete(): void {
    this.longBreakTimer.stop();
  }

  incrementPomodoroCount(): void {
    const pomodoros = this.session.get(SessionSetting.NumberOfPomodoros, 0) + 1;
    this.session.set(SessionSetting.NumberOfPomodoros, pomodoros);
  }

}
