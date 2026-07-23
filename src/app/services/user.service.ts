import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap, map } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

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

  constructor(private http: HttpClient) {}

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

  private readonly DISCOUNT_THRESHOLD = 3;
  private readonly DISCOUNT_RATE = 0.1;

  isEligibleForDiscount(): boolean {
    return (this.currentUserPurchases$.getValue() ?? 0) > this.DISCOUNT_THRESHOLD;
  }

  getDiscountedPrice(originalPrice: number): number {
    return this.isEligibleForDiscount() ? originalPrice * (1 - this.DISCOUNT_RATE) : originalPrice;
  }
}
