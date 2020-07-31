import { Injectable } from '@angular/core';
import { Setting } from './setting.enum';
import { toMilliseconds } from './to-milliseconds';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  get<T>(key: Setting, defaultValue: T | null = null): T {
    const value = localStorage.getItem(key);
    if (value === null && defaultValue !== null) {
      this.set(key, defaultValue);
      return defaultValue;
    }
    if (value === null) {
      throw new Error(`Key ${key} is used before its value is set`);
    }
    return JSON.parse(value);
  }

  set<T>(key: Setting, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  fillEmptyWithDefaults(): void {
    this.get(Setting.WorkLength, toMilliseconds({ minutes: 25 }));
    this.get(Setting.ShortBreakLength, toMilliseconds({ minutes: 5 }));
    this.get(Setting.LongBreakLength, toMilliseconds({ minutes: 15 }));
    this.get(Setting.EnableNotifications, false);
  }
}
