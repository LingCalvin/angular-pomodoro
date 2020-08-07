import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../notification.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SettingsService } from '../settings.service';
import { Setting } from '../setting.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { toMilliseconds } from '../to-milliseconds';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  maxTime = 59.99;
  private timeValidators = Validators.compose([Validators.required, Validators.min(0), Validators.max(this.maxTime)]);
  notificationsEnabled = false;
  onlyShowNotificationsIfHiddenCtrl = new FormControl();
  enableNotificationSoundControl = new FormControl();
  workSessionLengthCtrl = new FormControl('', this.timeValidators);
  shortBreakLengthCtrl = new FormControl('', this.timeValidators);
  longBreakLengthCtrl = new FormControl('', this.timeValidators);
  private refreshRequiredNotified = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private notifiction: NotificationService,
    private settings: SettingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.notificationsEnabled = Notification.permission === 'granted'
      && this.settings.get(Setting.EnableNotifications);
    const timeMaps = [this.minutesToMilliseconds, this.millisecondsToMinutes];

    this.keepSynced(this.workSessionLengthCtrl, Setting.WorkLength, ...timeMaps);
    this.keepSynced(this.shortBreakLengthCtrl, Setting.ShortBreakLength, ...timeMaps);
    this.keepSynced(this.longBreakLengthCtrl, Setting.LongBreakLength, ...timeMaps);
    this.keepSynced(this.enableNotificationSoundControl, Setting.EnableNotificationSound);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  keepSynced(
    formControl: FormControl,
    setting: Setting,
    formToSettingMap?: (value: any) => any,
    settingToFormMap?: (value: any) => any
  ): void {
    let settingValue = this.settings.get(setting);
    if (settingToFormMap) {
      settingValue = settingToFormMap(settingValue);
    }
    formControl.setValue(settingValue);
    formControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        if (!formControl.valid) {
          return;
        }
        if (formToSettingMap) {
          this.settings.set(setting, formToSettingMap(value));
        } else {
          this.settings.set(setting, value);
        }
      });
  }

  handleNotificationToggle(change: MatSlideToggleChange): void {
    if (change.checked) {
      this.notifiction.requestPermission().then((perm) => {
        this.settings.set(Setting.EnableNotifications, perm === 'granted');
        if (perm !== 'granted') {
          change.source.toggle();
          this.snackBar
            .open('Failed to acquire permission to display notifications.',
              'Dismiss',
              { duration: 5000 });
        }
      });
    } else {
      this.settings.set(Setting.EnableNotifications, false);
    }
  }

  notifyRefreshRequired(): void {
    if (!this.refreshRequiredNotified) {
      this.snackBar
        .open('A refresh is required to apply your changes.', 'Dismiss');
      this.refreshRequiredNotified = true;
    }
  }

  private millisecondsToMinutes(milliseconds: number) {
    return milliseconds / 60000;
  }

  private minutesToMilliseconds(minutes: number) {
    return toMilliseconds({ minutes });
  }
}
