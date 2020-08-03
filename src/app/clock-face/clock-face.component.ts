import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CountdownTimer } from '../countdown-timer';

@Component({
  selector: 'app-clock-face',
  templateUrl: './clock-face.component.html',
  styleUrls: ['./clock-face.component.css']
})
export class ClockFaceComponent implements OnInit {

  @Input() timer: CountdownTimer;
  time$: Observable<number>;

  constructor() { }

  ngOnInit(): void {
    this.time$ = this.timer.getTimeObservable();
  }

}
