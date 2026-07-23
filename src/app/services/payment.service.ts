import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IPaymentDetails {
  cardType: string;
  cardLast4: string;
  expiry: string;
  firstName: string;
  lastName: string;
  nationalId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentDetails$ = new BehaviorSubject<IPaymentDetails | null>(null);

  setPaymentDetails(details: IPaymentDetails) {
    this.paymentDetails$.next(details);
  }

  getPaymentDetails(): IPaymentDetails | null {
    return this.paymentDetails$.getValue();
  }
}