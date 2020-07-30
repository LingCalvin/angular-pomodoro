import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ClockFaceComponent } from './clock-face/clock-face.component';
import { IndexComponent } from './index/index.component';
import { IndexToolbarComponent } from './index-toolbar/index-toolbar.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    ClockFaceComponent,
    IndexComponent,
    IndexToolbarComponent,
    PomodoroComponent,
    TimerControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
