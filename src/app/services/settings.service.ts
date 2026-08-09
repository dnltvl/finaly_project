import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ISettings } from '../interfaces/settings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  baseURL: string = 'http://localhost:3000/';

  // ברירת מחדל זמנית, עד שהערכים האמיתיים נטענים מהשרת
  settings$ = new BehaviorSubject<ISettings>({
    vatRate: 0.18,
    discountThreshold: 3,
    discountRate: 0.1
  });

  constructor(private http: HttpClient) {}

  loadSettings(): Observable<ISettings> {
    return this.http.get<ISettings>(`${this.baseURL}settings`).pipe(
      tap((settings) => {
        this.settings$.next(settings);
      })
    );
  }

  updateSettings(settings: ISettings): Observable<ISettings> {
    return this.http.patch<ISettings>(`${this.baseURL}settings`, settings).pipe(
      tap((updatedSettings) => {
        this.settings$.next(updatedSettings);
      })
    );
  }

  getCurrentSettings(): ISettings {
    return this.settings$.getValue();
  }
}