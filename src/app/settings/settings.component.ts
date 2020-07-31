import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SettingsService } from '../settings.service';
import { Setting } from '../setting.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  notificationsEnabled = false;

  constructor(private notifiction: NotificationService, private settings: SettingsService, private snackBar: MatSnackBar) {
    this.handleNotificationToggle = this.handleNotificationToggle.bind(this);
  }

  ngOnInit(): void {
    this.notificationsEnabled = Notification.permission === 'granted' && this.settings.get(Setting.EnableNotifications);
  }

  handleNotificationToggle(change: MatSlideToggleChange): void {
    if (change.checked) {
      this.notifiction.requestPermission().then((perm) => {
        this.settings.set(Setting.EnableNotifications, perm === 'granted');
        if (perm !== 'granted') {
          change.source.toggle();
          this.snackBar.open('Failed to get permission for notifications.', 'Dismiss', {duration: 3000});
        }
      });
    } else {
      this.settings.set(Setting.EnableNotifications, false);
    }
  }
}
