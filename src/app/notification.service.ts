import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  sendNotification(title: string, options?: NotificationOptions): void {
    const notification = new Notification(title, options);
  }

  sendNotificationIfHidden(title: string, options?: NotificationOptions): void {
    console.log(document.hidden);
    if (document.hidden) {
      this.sendNotification(title, options);
    }
  }
}
