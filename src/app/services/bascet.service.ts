import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap, map, forkJoin } from 'rxjs';
import { IBascet } from '../interfaces/bascet.interface';

@Injectable({
  providedIn: 'root',
})
export class BascetService {
  baseURL: string = 'http://localhost:3000/';
  signedinBascet$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) {}

  getAllBascets(): Observable<IBascet[]> {
    return this.http.get<IBascet[]>(`${this.baseURL}baskets`);
  }

  getBascetsByUserId(userId: number): Observable<IBascet[]> {
    return this.http.get<IBascet[]>(`${this.baseURL}baskets?userId=${userId}&_=${Date.now()}`);
  }

  getBascetById(bascetId: number): Observable<IBascet> {
    const bascets$ = this.http.get<IBascet[]>(`${this.baseURL}baskets?id=${bascetId}`);
    return bascets$.pipe(
      filter((bascets): bascets is [IBascet] => !!bascets.length),
      map(([bascet]) => bascet)
    );
  }

  createBascet(bascet: IBascet): Observable<IBascet> {
    return this.http.post<IBascet>(`${this.baseURL}baskets`, bascet).pipe(
      tap(() => {
        this.signedinBascet$.next(true);
      })
    );
  }

  updateBascet(id: number, itemQty: number, itemPrice: number): Observable<IBascet> {
    return this.http.patch<IBascet>(`${this.baseURL}baskets/${id}`, { itemQty, itemPrice });
  }

  deleteBascet(id: number): Observable<IBascet> {
    return this.http.delete<IBascet>(`${this.baseURL}baskets/${id}`);
  }

  deleteAllBascets(ids: number[]): Observable<IBascet[]> {
    const deleteRequests = ids.map(id => this.deleteBascet(id));
    return forkJoin(deleteRequests);
  }

  editBascet(bascet: IBascet): Observable<IBascet> {
    return this.http.patch<IBascet>(`${this.baseURL}baskets/${bascet.itemId}`, bascet)
  }
}