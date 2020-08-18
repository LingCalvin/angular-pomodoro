import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PomodoroService } from '../pomodoro.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetCounterConfirmDialogComponent } from '../reset-counter-confirm-dialog/reset-counter-confirm-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-work-counter',
  templateUrl: './work-counter.component.html',
  styleUrls: ['./work-counter.component.css']
})
export class WorkCounterComponent implements OnInit, OnDestroy {

  count$: Observable<number>;
  private ngUnsubscribe = new Subject<void>();

  constructor(private dialog: MatDialog, private pomodoro: PomodoroService) {
    this.resetCount = this.resetCount.bind(this);
  }

  ngOnInit(): void {
    this.getPomodorosCompleted();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  resetCount(): void {
    this.pomodoro.resetPomodoroCount();
  }

  confirmReset() {
    const prompt = this.dialog.open(ResetCounterConfirmDialogComponent);
    prompt.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        if (result) {
          this.resetCount();
        }
      });
  }

  private getPomodorosCompleted() {
    this.count$ = this.pomodoro.getPomodorosCompleted();
  }

}
