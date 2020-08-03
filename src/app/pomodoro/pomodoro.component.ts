import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CountdownTimer } from '../countdown-timer';
import { PomodoroService } from '../pomodoro.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit, OnDestroy {

  workTimer: CountdownTimer;
  shortBreakTimer: CountdownTimer;
  longBreakTimer: CountdownTimer;
  activeTabIndex: number | null;
  private ngUnsubscribe = new Subject<void>();

  constructor(private cdRef: ChangeDetectorRef, private pomodoro: PomodoroService) {
    this.setActiveTab = this.setActiveTab.bind(this);
    this.workTimer = this.pomodoro.workTimer;
    this.shortBreakTimer = this.pomodoro.shortBreakTimer;
    this.longBreakTimer = this.pomodoro.longBreakTimer;
  }

  ngOnInit(): void {
    this.pomodoro.reloadSettings();
    this.pomodoro
      .getState()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => this.setActiveTab(value));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setActiveTab(state: 'work' | 'short' | 'long'): void {
    switch (state) {
      case 'work':
        this.activeTabIndex = 0;
        break;
      case 'short':
        this.activeTabIndex = 1;
        break;
      case 'long':
        this.activeTabIndex = 2;
    }
    this.cdRef.detectChanges();
  }

}
