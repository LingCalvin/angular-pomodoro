import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ClockFaceComponent } from './clock-face/clock-face.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    ClockFaceComponent,
    PomodoroComponent,
    TimerControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
