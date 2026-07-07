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
}
