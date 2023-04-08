import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-product1-comp',
  templateUrl: './product1-comp.component.html',
  styleUrls: ['./product1-comp.component.css']
})

export class Product1CompComponent implements OnInit {

  itemsList: IItem[] = [];
  item:IItem = Object({
    id: null,
    pic: "",
    header: "",
    paragraph: "",
    pic1: "",
    header1: "",
    paragraph1: "",
    qty: null,
    price: null,}
    )
  
  prodId: any;
  result_t: any;
  count_t: any;
  result: number = 0;
  count: number = 0;
  qty: number = 0;

  constructor(private activatedRoute : ActivatedRoute, private itemService: ItemService) 
  {
    this.activatedRoute.paramMap.subscribe(params => this.prodId = params.get("prodId"));
    this.activatedRoute.paramMap.subscribe(params => this.result_t = params.get("result_t"));
    this.activatedRoute.paramMap.subscribe(params => this.count_t = params.get("count_t"));
  }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items)=>{
      this.itemsList = items;
      console.log(this.itemsList);
      this.qty = this.itemsList[this.prodId].qty;
      this.item = items[this.prodId]
      console.log(this.item)
    })
    }

plus(price: number)
{
  if(this.qty > 0)
  {
  this.result += price;
  this.count ++;
  this.qty --;
  this.result_t=this.result;
  this.count_t=this.count;
  }
}
minus(price: number)
{
  if(this.qty >= 0)
  {
  this.result -= price;
  this.count --;
  this.qty ++;
  if(this.count < 0)
  {
    this.result = 0;
    this.count = 0;
    this.qty = this.itemsList[this.prodId].qty; 
  }
}
}
cancel()
{
  this.result = 0;
  this.count = 0;
  this.qty = this.itemsList[this.prodId].qty;
}

updItem()
{
  const uItem: IItem = Object({
    id: this.item.id,
    pic: this.item.pic,
    header: this.item.header,
    paragraph: this.item.paragraph,
    pic1: this.item.pic1,
    header1: this.item.header1,
    paragraph1: this.item.paragraph1,
    qty: this.qty,
    price: this.item.price,}
    )
  const newItem = this.itemService.updateItem(this.item.id, uItem).subscribe();
  console.log(newItem)
}

}


