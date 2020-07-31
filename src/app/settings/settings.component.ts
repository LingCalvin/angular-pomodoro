import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SettingsService } from '../settings.service';
import { Setting } from '../setting.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private timeValidators = Validators.compose([Validators.required, Validators.min(0), Validators.max(215999999)]);
  notificationsEnabled = false;
  workSessionLengthControl = new FormControl('', this.timeValidators);
  shortBreakLengthControl = new FormControl('', this.timeValidators);
  longBreakLengthControl = new FormControl('', this.timeValidators);

  constructor(private notifiction: NotificationService, private settings: SettingsService, private snackBar: MatSnackBar) {
    this.handleNotificationToggle = this.handleNotificationToggle.bind(this);
  }

  ngOnInit(): void {
    this.notificationsEnabled = Notification.permission === 'granted' && this.settings.get(Setting.EnableNotifications);
    this.keepSynced(this.workSessionLengthControl, Setting.WorkLength);
    this.keepSynced(this.shortBreakLengthControl, Setting.ShortBreakLength);
    this.keepSynced(this.longBreakLengthControl, Setting.LongBreakLength);
  }

  keepSynced(formControl: FormControl, setting: Setting): void {
    formControl.setValue(this.settings.get(setting));
    formControl.valueChanges.subscribe((value) => {
      if (formControl.valid) {
        this.settings.set(setting, formControl.value);
      }
    });
  }

  handleNotificationToggle(change: MatSlideToggleChange): void {
    if (change.checked) {
      this.notifiction.requestPermission().then((perm) => {
        this.settings.set(Setting.EnableNotifications, perm === 'granted');
        if (perm !== 'granted') {
          change.source.toggle();
          this.snackBar.open('Failed to acquire permission for notifications.', 'Dismiss', { duration: 5000 });
        }
      });
    } else {
      this.settings.set(Setting.EnableNotifications, false);
    }
  }
}
