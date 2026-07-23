import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BascetService } from '../services/bascet.service';
import { ItemService } from '../services/item.service';
import { Item2Service } from '../services/item2.service';
import { UserService } from '../services/user.service';
import { PaymentService, IPaymentDetails } from '../services/payment.service';
import { IBascet } from '../interfaces/bascet.interface';
import { IItem } from '../interfaces/item.interface';
import { IItem2 } from '../interfaces/item2.interface';

export interface IInvoiceLine extends IBascet {
  header: string;
}

@Component({
  selector: 'app-finale',
  templateUrl: './finale.component.html',
  styleUrls: ['./finale.component.css']
})
export class FinaleComponent implements OnInit {

  userId: number = 0;
  invoiceLines: IInvoiceLine[] = [];
  paymentDetails: IPaymentDetails | null = null;

  subtotal: number = 0;
  vatAmount: number = 0;
  grandTotal: number = 0;

  private readonly VAT_RATE = 0.18;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bascetService: BascetService,
    private itemService: ItemService,
    private item2Service: Item2Service,
    private userService: UserService,
    private paymentService: PaymentService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
    });
  }

  ngOnInit(): void {
    this.paymentDetails = this.paymentService.getPaymentDetails();

    forkJoin({
      bascets: this.bascetService.getBascetsByUserId(this.userId),
      items: this.itemService.getAllItems(),
      items2: this.item2Service.getAllItems2()
    }).subscribe(({ bascets, items, items2 }) => {
      const itemsMap = new Map<string, IItem | IItem2>([
        ...items.map(item => [`1-${item.id}`, item] as [string, IItem]),
        ...items2.map(item => [`2-${item.id}`, item] as [string, IItem2])
      ]);

      this.invoiceLines = bascets.map(bascet => {
        const key = `${bascet.itemType}-${bascet.itemId}`;
        const matchedItem = itemsMap.get(key);
        return {
          ...bascet,
          header: matchedItem?.header ?? ''
        };
      });

      this.subtotal = this.invoiceLines.reduce((sum, line) => sum + line.itemPrice, 0);
      this.vatAmount = this.subtotal * this.VAT_RATE;
      this.grandTotal = this.subtotal + this.vatAmount;

      if (bascets.length > 0) {
        const ids = bascets.map(b => b.id);
        this.bascetService.deleteAllBascets(ids).subscribe(() => {
          this.bascetService.signedinBascet$.next(false);
        });

        // מעדכנים את מונה הרכישות של המשתמש
        this.userService.getUserById(this.userId).subscribe((user) => {
          const updatedUser = {
            ...user,
            purchases: (user.purchases ?? 0) + 1
          };
          this.userService.editUser(updatedUser).subscribe();
        });
      }
    });
  }
}