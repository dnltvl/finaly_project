import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap, map } from 'rxjs';
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseURL: string = 'http://localhost:3000/';
  signedin$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<IItem[]>{
    return this.http.get<IItem[]>(`${this.baseURL}items`);
  }

  getItemById(itemId: number): Observable<IItem> {
    const items$ = this.http.get<IItem[]>(`${this.baseURL}items?id=${itemId}`);
    return items$.pipe(
      filter((items): items is [IItem] => !!items.length),
      map(([item]) => item)
    );
    }

  createItem(item: IItem): Observable<IItem> {
     return this.http.post<IItem>(`${this.baseURL}items`, item).pipe(
       tap(() => {
         this.signedin$.next(true);
       })
     );
   }

  deleteItem(itemId: number): Observable<IItem> {
      return this.http.delete<IItem>(`${this.baseURL}items/${itemId}`);
  }

  updateItem(item: IItem): Observable<IItem>{
      return this.http.patch<IItem>(`${this.baseURL}items/${item.id}`, item)
 }
}
