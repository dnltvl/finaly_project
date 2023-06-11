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
  result: any;
  count: any;

  
  constructor(private activatedRoute : ActivatedRoute, private itemService: ItemService) 
  {
    this.activatedRoute.paramMap.subscribe(params => this.prodId = params.get("prodId"));
    this.activatedRoute.paramMap.subscribe(params => this.result = params.get("result"));
    this.activatedRoute.paramMap.subscribe(params => this.count = params.get("count"));

  }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items)=>{
      this.item = items[this.prodId]
    })
    }

}


