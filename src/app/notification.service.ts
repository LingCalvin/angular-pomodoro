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
    if (this.settings.get<boolean>(Setting.EnableNotifications)) {
      this.requestPermission().then((perm) => {
        if (perm === 'granted') {
          const notification = new Notification(title, options);
        }
      });
    }
  }

  sendNotificationIfHidden(title: string, options?: NotificationOptions): void {
    console.log(document.hidden);
    if (document.hidden) {
      this.sendNotification(title, options);
    }
  }
}
