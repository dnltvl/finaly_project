import { Component, OnInit } from '@angular/core';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-category1-comp',
  templateUrl: './category1-comp.component.html',
  styleUrls: ['./category1-comp.component.css']
})
export class Category1CompComponent implements OnInit {
  flowers: IItem[] = [];
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items)=>{
      this.flowers = items;
    })
  }

}
