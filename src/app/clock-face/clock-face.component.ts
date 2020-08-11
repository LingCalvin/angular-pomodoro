import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Timer } from '../timer';

@Component({
  selector: 'app-clock-face',
  templateUrl: './clock-face.component.html',
  styleUrls: ['./clock-face.component.css']
})
export class ClockFaceComponent implements OnInit {

  @Input() timer: Timer;
  time$: Observable<number>;

  constructor() { }

  ngOnInit(): void {
    this.time$ = this.timer.getTimeLeftObservable();
  }

}
