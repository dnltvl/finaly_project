import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IBascet } from '../interfaces/bascet.interface';
import { BascetService } from '../services/bascet.service';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';
import { IItem2 } from '../interfaces/item2.interface';
import { Item2Service } from '../services/item2.service';
import { UserService } from '../services/user.service';

export interface IBascetWithPic extends IBascet {
  pic: string;
  header: string;
}

@Component({
  selector: 'app-bascet-manage-form',
  templateUrl: './bascet-manage-form.component.html',
  styleUrls: ['./bascet-manage-form.component.css'],
})
export class BascetManageFormComponent implements OnInit {
  bascet: IBascetWithPic[] = [];
  itemsMap = new Map<string, IItem | IItem2>();
  userId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bascetService: BascetService,
    private itemService: ItemService,
    private item2Service: Item2Service,
    private userService: UserService   // <-- הוספה
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
    });
  }

  ngOnInit(): void {
    forkJoin({
      bascets: this.bascetService.getBascetsByUserId(this.userId),
      items: this.itemService.getAllItems(),
      items2: this.item2Service.getAllItems2()
    }).subscribe(({ bascets, items, items2 }) => {
      this.itemsMap = new Map<string, IItem | IItem2>([
        ...items.map(item => [`1-${item.id}`, item] as [string, IItem]),
        ...items2.map(item => [`2-${item.id}`, item] as [string, IItem2])
      ]);

      this.bascet = bascets.map(bascet => {
        const key = `${bascet.itemType}-${bascet.itemId}`;
        const matchedItem = this.itemsMap.get(key);
        return {
          ...bascet,
          pic: matchedItem?.pic ?? '',
          header: matchedItem?.header ?? ''
        };
      });
    });
  }

deleteBascet(id: number) {
  if (!confirm('Are you sure you want to delete the item?')) {
    return;
  }
  this.bascetService.deleteBascet(id).subscribe(() => {
    this.bascet = this.bascet.filter(b => b.id !== id);
    if (this.bascet.length === 0) {
      this.bascetService.signedinBascet$.next(false);
    }
  });
}

deleteAllBascets() {
  if (this.bascet.length === 0) {
    return;
  }
  if (!confirm('Are you sure you want to delete the basket?')) {
    return;
  }
  const ids = this.bascet.map(b => b.id);
  this.bascetService.deleteAllBascets(ids).subscribe(() => {
    this.bascet = [];
    this.bascetService.signedinBascet$.next(false);
  });
}

  plusQty(bascet: IBascetWithPic) {
    const newQty = bascet.itemQty + 1;
    this.updateQtyAndPrice(bascet, newQty);
  }

  minusQty(bascet: IBascetWithPic) {
    if (bascet.itemQty <= 1) {
      return;
    }
    const newQty = bascet.itemQty - 1;
    this.updateQtyAndPrice(bascet, newQty);
  }

  private updateQtyAndPrice(bascet: IBascetWithPic, newQty: number) {
    const key = `${bascet.itemType}-${bascet.itemId}`;
    const item = this.itemsMap.get(key);
    const originalUnitPrice = item?.price ?? 0;
    const effectiveUnitPrice = this.userService.getDiscountedPrice(originalUnitPrice); // <-- שינוי
    const newTotalPrice = effectiveUnitPrice * newQty;

    this.bascetService.updateBascet(bascet.id, newQty, newTotalPrice).subscribe(() => {
      bascet.itemQty = newQty;
      bascet.itemPrice = newTotalPrice;
    });
  }
}