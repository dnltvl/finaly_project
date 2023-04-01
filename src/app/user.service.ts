import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { IUser } from './interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURI: string = 'http://localhost:3000/';
  signIn$ = new BehaviorSubject<boolean>(false);
  users: IUser[] = [];
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseURI}users`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURI}users`, user).pipe(
      tap(() => {
        this.signIn$.next(true);
      })
    );
  }

  deleteUser(user: IUser): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseURI}users/${user.userName}`);
  }

  editUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseURI}users/${user.userName}`, user);
  }

  signIn(user: IUser) {
    // this.getAllUsers().subscribe((users) => {
    //   this.users = users;
    // });

    this.http.get<IUser[]>(`${this.baseURI}users`).pipe(
      filter((users) => users === users),
      tap(() => {
        this.signIn$.next(true);
        console.log(user);
        localStorage.setItem('userName', user.userName);
      })
    );

    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].userName === user.userName &&
        this.users[i].password === user.password
      ) {
        // this.signIn$.next(true);
      }
    }
  }
}
