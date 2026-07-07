import { Component, OnInit } from '@angular/core';
import { IItem2 } from '../interfaces/item2.interface';
import { Item2Service } from '../services/item2.service';

@Component({
  selector: 'app-category2-comp',
  templateUrl: './category2-comp.component.html',
  styleUrls: ['./category2-comp.component.css']
})
export class Category2CompComponent implements OnInit {
  decor: IItem2[] = [];
  constructor(private item2Service: Item2Service) { }

  ngOnInit(): void {
    this.item2Service.getAllItems().subscribe((items2)=>{
      this.decor = items2;
    })
  }

}
