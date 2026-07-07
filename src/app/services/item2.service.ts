import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem2 } from '../interfaces/item2.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Item2Service {
  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<IItem2[]>{
    return this.http.get<IItem2[]>(`${this.baseURL}items2`);
  }

  updateItem(itemId: number, item2: IItem2): Observable<IItem2>{
    return this.http.patch<IItem2>(`${this.baseURL}items2/${itemId}`, item2)
 }
}
