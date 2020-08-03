import { Component, Input, OnInit } from '@angular/core';
import { CountdownTimer } from '../countdown-timer';
import { tap } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() timer: CountdownTimer;
  showPlay = true;
  showPause = true;
  showStop = true;
  timerState$: Observable<'running' | 'paused' | 'reset'>;

  ngOnInit(): void {
    this.timerState$ = this.timer.getState();
  }

}
