import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-finale',
  templateUrl: './finale.component.html',
  styleUrls: ['./finale.component.css']
})

export class FinaleComponent implements OnInit {

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

  prodId : any;
  result_t : any;
  count_t : any;
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
    //this.qty = this.itemsList[this.userID].qty; 
  }
}
}
cancel()
{
  this.result = 0;
  this.count = 0;
  //this.qty = this.itemsList[this.userID].qty;
}

}


