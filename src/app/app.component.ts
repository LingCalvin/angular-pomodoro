import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pomodoro';

  constructor(private settings: SettingsService) { }

  ngOnInit() {
    this.settings.fillEmptyWithDefaults();
  }
}
