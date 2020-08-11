import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Timer, state } from '../timer';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() timer: Timer;
  showPlay = true;
  showPause = true;
  showStop = true;
  timerState$: Observable<state>;

  ngOnInit(): void {
    this.timerState$ = this.timer.getStateObservable();
  }

}
