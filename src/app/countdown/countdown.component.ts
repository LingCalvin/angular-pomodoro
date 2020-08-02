import { Component, Input } from '@angular/core';
import { CountdownTimer } from '../countdown-timer';
import { tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent {

  @Input() timer: CountdownTimer;
  showPlay = true;
  showPause = true;
  showStop = true;

}
