import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.css']
})
export class TimerControlsComponent {

  @Output() started = new EventEmitter<void>();
  @Output() paused = new EventEmitter<void>();
  @Output() stopped = new EventEmitter<void>();

}
