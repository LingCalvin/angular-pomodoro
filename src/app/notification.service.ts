import { Injectable } from '@angular/core';
import { Setting } from './setting.enum';
import { SettingsService } from './settings.service';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationSound: HTMLAudioElement;

  constructor(private settings: SettingsService) {
    this.notificationSound = new Audio('./assets/sounds/ping.flac');
  }

  requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  send(title: string, options?: NotificationOptions): void {
    this.requestPermission().then((perm) => {
      if (perm === 'granted') {
        this.notify(title, options);
      }
    });
  }

  checkPreferencesAndSend(title: string, options?: NotificationOptions): void {
    if (this.settings.get<boolean>(Setting.EnableNotificationSound)) {
      this.notificationSound.play();
    }
    if (!this.settings.get<boolean>(Setting.EnableNotifications)) {
      return;
    }

    if (!this.settings.get<boolean>(Setting.OnlyShowNotificationsIfHidden)) {
      this.send(title, options);
    } else if (document.hidden) {
      this.send(title, options);
    }
  }

  private notify(title: string, options?: NotificationOptions): void {
    // NOTE: Chrome for Android requires notifications be sent from a service
    // worker
    if ('serviceWorker' in navigator && !isDevMode()) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    } else {
      const notification = new Notification(title, options);
    }
  }

}
