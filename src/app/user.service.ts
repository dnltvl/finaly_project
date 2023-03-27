import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseURI: string = 'http://localhost:3000/';
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseURI}users`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURI}/users`, user);
  }

  deleteUser(user: IUser): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseURI}/users/${user.userName}`);
  }

  editUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseURI}/users/${user.userName}`, user);
  }

}
