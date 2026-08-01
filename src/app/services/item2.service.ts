import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem2 } from '../interfaces/item2.interface';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Item2Service {
  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllItems2(): Observable<IItem2[]>{
    return this.http.get<IItem2[]>(`${this.baseURL}items2`);
  }

getItem2ById(itemId: number): Observable<IItem2> {
  const items$ = this.http.get<IItem2[]>(`${this.baseURL}items2?id=${itemId}`);
  return items$.pipe(
    filter((items): items is [IItem2] => !!items.length),
    map(([item]) => item)
  );

}
  updateItem(itemId: number, item2: IItem2): Observable<IItem2>{
    return this.http.patch<IItem2>(`${this.baseURL}items2/${itemId}`, item2)
 }

 createItem2(item2: IItem2): Observable<IItem2> {
  return this.http.post<IItem2>(`${this.baseURL}items2`, item2);
}
deleteItem2(itemId: number): Observable<IItem2> {
  return this.http.delete<IItem2>(`${this.baseURL}items2/${itemId}`);
}
}
