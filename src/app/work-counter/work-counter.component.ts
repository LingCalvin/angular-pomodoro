import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PomodoroService } from '../pomodoro.service';

@Component({
  selector: 'app-work-counter',
  templateUrl: './work-counter.component.html',
  styleUrls: ['./work-counter.component.css']
})
export class WorkCounterComponent implements OnInit {

  count$: Observable<number>;

  constructor(private pomodoro: PomodoroService) {
    this.resetCount = this.resetCount.bind(this);
  }

  ngOnInit(): void {
    this.getPomodorosCompleted();
  }

  resetCount(): void {
    this.pomodoro.resetPomodoroCount();
  }

  private getPomodorosCompleted() {
    this.count$ = this.pomodoro.getPomodorosCompleted();
  }

}
