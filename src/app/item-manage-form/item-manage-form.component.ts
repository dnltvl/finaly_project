import { Component, OnInit } from '@angular/core';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-manage-form',
  templateUrl: './item-manage-form.component.html',
  styleUrls: ['./item-manage-form.component.css'],
})
export class ItemManageFormComponent implements OnInit {
  items: IItem[] = [];
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items)=>{
      this.items = items;
    })
  }
  
  deleteItem(itemId: number){
    this.itemService.deleteItem(itemId).subscribe(()=>{
      this.items = this.items.filter(i => i.id !== itemId);
    });
  }
}
