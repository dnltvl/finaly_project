import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import items from '../items.json';

export class Items
{
  pic: string;
  header: string;
  paragraph: string;
  pic1: string;
  header1: string;
  paragraph1: string;
  qty: number;
  price: number;
constructor( pic: string, header: string, paragraph: string, pic1: string, header1: string, paragraph1: string, qty: number, price: number )
{
  this.pic = pic;
  this.header = header;
  this.paragraph = paragraph;
  this.pic1 = pic1;
  this.header1 = header1;
  this.paragraph1 = paragraph1;
  this.qty = qty;
  this.price = price;
}
}
@Component({
  selector: 'app-finale',
  templateUrl: './finale.component.html',
  styleUrls: ['./finale.component.css']
})

export class FinaleComponent implements OnInit {
  userID : any;
  result_t : any;
  count_t : any;
  result: number = 0;
  count: number = 0;
  qty: number = 0;

  itemsList: Items[];
  constructor(private activatedRoute : ActivatedRoute) 
  {
    this.itemsList= items;
    this.activatedRoute.paramMap.subscribe(params => this.userID = params.get("id"));
    this.activatedRoute.paramMap.subscribe(params => this.result_t = params.get("result_t"));
    this.activatedRoute.paramMap.subscribe(params => this.count_t = params.get("count_t"));
    this.qty = this.itemsList[this.userID].qty;
  }

  ngOnInit(): void {
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
    this.qty = this.itemsList[this.userID].qty; 
  }
}
}
cancel()
{
  this.result = 0;
  this.count = 0;
  this.qty = this.itemsList[this.userID].qty;
}

}


