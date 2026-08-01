import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';
import { IItem2 } from '../interfaces/item2.interface';
import { Item2Service } from '../services/item2.service';
import { IBascet } from '../interfaces/bascet.interface';
import { BascetService } from '../services/bascet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-comp',
  templateUrl: './product-comp.component.html',
  styleUrls: ['./product-comp.component.css']
})
export class ProductCompComponent implements OnInit {

  itemsList: (IItem | IItem2)[] = [];
  item: (IItem | IItem2) = Object({
    id: null,
    pic: "",
    header: "",
    paragraph: "",
    pic1: "",
    header1: "",
    paragraph1: "",
    qty: null,
    price: null,
  })

  isSubmitDisabled = true;
  itemType: number = 0;
  prodId: any;
  result: any;
  count: any;
  qty: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private item2Service: Item2Service,
    private bascetService: BascetService,
    public userService: UserService,   // <-- public, כי גם ה-HTML ישתמש בו
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(params => this.itemType = Number(params.get("itemType")));
    this.activatedRoute.paramMap.subscribe(params => this.prodId = params.get("prodId"));
    this.activatedRoute.paramMap.subscribe(params => this.result = params.get("result"));
    this.activatedRoute.paramMap.subscribe(params => this.count = params.get("count"));
  }

  ngOnInit(): void {
    if (this.itemType === 1) {
      this.itemService.getAllItems().subscribe((items) => {
        this.itemsList = items;
        this.qty = this.itemsList[this.prodId].qty;
        this.item = items[this.prodId];
      });
    } else if (this.itemType === 2) {
      this.item2Service.getAllItems2().subscribe((items2) => {
        this.itemsList = items2;
        this.qty = this.itemsList[this.prodId].qty;
        this.item = items2[this.prodId];
      });
    }
  }

  // מחזיר את המחיר בפועל שיש להשתמש בו בחישובים (מוזל אם רלוונטי)
  get effectivePrice(): number {
    return this.userService.getDiscountedPrice(this.item.price);
  }

  plus() {
    this.isSubmitDisabled = false;
    if (this.qty > 0) {
      this.result += this.effectivePrice;
      this.count++;
      this.qty--;
    } else {
      this.isSubmitDisabled = true;
    }
  }

  minus() {
    if (this.count > 0) {
      this.result -= this.effectivePrice;
      this.count--;
      this.qty++;
      if (this.count < 0) {
        this.result = 0;
        this.count = 0;
        this.qty = this.itemsList[this.prodId].qty;
      }
    }
    if (this.count == 0) {
      this.isSubmitDisabled = true;
    }
  }

  cancel() {
    this.result = 0;
    this.count = 0;
    this.qty = this.itemsList[this.prodId].qty;
    this.isSubmitDisabled = true;
  }

  updItem() {
    if (this.itemType === 1) {
      const uItem: IItem = Object({
        id: this.item.id,
        pic: this.item.pic,
        header: this.item.header,
        sub_header: this.item.sub_header,
        paragraph: this.item.paragraph,
        pic1: this.item.pic1,
        header1: this.item.header1,
        paragraph1: this.item.paragraph1,
        qty: this.qty,
        price: this.item.price,
      })
      this.itemService.updateItem(uItem).subscribe();
    } else if (this.itemType === 2) {
      const uItem2: IItem2 = Object({
        id: this.item.id,
        pic: this.item.pic,
        header: this.item.header,
        sub_header: this.item.sub_header,
        paragraph: this.item.paragraph,
        pic1: this.item.pic1,
        header1: this.item.header1,
        paragraph1: this.item.paragraph1,
        qty: this.qty,
        price: this.item.price,
      })
      this.item2Service.updateItem(this.item.id, uItem2).subscribe();
    }
  }

  addToBasket() {
    const currentUserId = this.userService.currentUserId$.getValue();

    if (currentUserId === null) {
      alert('You must log in before adding to cart.');
      return;
    }

    this.bascetService.getBascetsByUserId(currentUserId).subscribe((userBascets) => {
      const existingItem = userBascets.find(b => b.itemId === this.item.id && b.itemType === this.itemType);

      if (existingItem) {
        const updatedQty = existingItem.itemQty + this.count;
        const updatedPrice = existingItem.itemPrice + this.result;

        this.bascetService.updateBascet(existingItem.id, updatedQty, updatedPrice).subscribe(() => {
          this.bascetService.signedinBascet$.next(true);
          this.router.navigate(['/BascetManage', currentUserId]);
        });
      } else {
        const newBascetItem: IBascet = {
          id: 0,
          orderId: currentUserId,
          userId: currentUserId,
          itemType: this.itemType,
          itemId: this.item.id,
          itemQty: this.count,
          itemPrice: this.result
        };

        this.bascetService.createBascet(newBascetItem).subscribe(() => {
          this.router.navigate(['/BascetManage', currentUserId]);
        });
      }
    });
  }
}