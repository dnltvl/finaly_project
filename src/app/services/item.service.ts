import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../interfaces/item.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<IItem[]>{
    return this.http.get<IItem[]>(`${this.baseURL}items`);
  }

  updateItem(itemId: number, item: IItem): Observable<IItem>{
    return this.http.patch<IItem>(`${this.baseURL}items/${itemId}`, item)
 }
}
