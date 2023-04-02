import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { IUser } from './interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURI: string = 'http://localhost:3000/';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  users: IUser[] = [];
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseURI}users`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURI}users`, user).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  deleteUser(user: IUser): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseURI}users/${user.userName}`);
  }

  editUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseURI}users/${user.userName}`, user);
  }
}
