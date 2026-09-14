import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap, map } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = 'http://localhost:3000/';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  signedinAdmin$ = new BehaviorSubject<boolean | null>(null);
  currentUserId$ = new BehaviorSubject<number | null>(null);
  currentUserName$ = new BehaviorSubject<string | null>(null);
  currentUserPurchases$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) {}

  private readonly STORAGE_KEY = 'currentUserId';

  saveUserIdToStorage(userId: number) {
    localStorage.setItem(this.STORAGE_KEY, String(userId));
  }

  getUserIdFromStorage(): number | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? Number(stored) : null;
  }

  clearUserIdFromStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
  
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseURL}users`);
  }

  getUserById(userId: number): Observable<IUser> {
    const users$ = this.http.get<IUser[]>(`${this.baseURL}users?id=${userId}`);
    return users$.pipe(
      filter((users): users is [IUser] => !!users.length),
      map(([user]) => user)
    );
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURL}users`, user).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  deleteUser(userId: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseURL}users/${userId}`);
  }

  editUser(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`${this.baseURL}users/${user.id}`, user);
  }

  isEligibleForDiscount(): boolean {
    const threshold = this.settingsService.getCurrentSettings().discountThreshold;
    return (this.currentUserPurchases$.getValue() ?? 0) > threshold;
  }

  getDiscountedPrice(originalPrice: number): number {
    const rate = this.settingsService.getCurrentSettings().discountRate;
    return this.isEligibleForDiscount() ? originalPrice * (1 - rate) : originalPrice;
  }

  getDiscountPercent(): number {
  return this.settingsService.getCurrentSettings().discountRate * 100;
  }
}