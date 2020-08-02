import { Injectable } from '@angular/core';
import { Setting } from './setting.enum';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private settings: SettingsService) { }

  requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  sendNotification(title: string, options?: NotificationOptions): void {
      this.requestPermission().then((perm) => {
        if (perm === 'granted') {
          const notification = new Notification(title, options);
        }
      });
  }

  sendNotificationIfDesired(title: string, options?: NotificationOptions): void {
    if (!this.settings.get<boolean>(Setting.EnableNotifications)) {
      return;
    }

    if (!this.settings.get<boolean>(Setting.OnlyShowNotificationsIfHidden)) {
      this.sendNotification(title, options);
    } else if (document.hidden) {
      this.sendNotification(title, options);
    }
  }
}
