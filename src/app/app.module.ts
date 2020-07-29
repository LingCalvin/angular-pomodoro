import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ClockFaceComponent } from './clock-face/clock-face.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    ClockFaceComponent,
    PomodoroComponent,
    TimerControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
