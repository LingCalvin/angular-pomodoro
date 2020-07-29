import { Component, Input } from '@angular/core';
import { CountdownTimer } from '../countdown-timer';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent {

  @Input() timer: CountdownTimer;

}
