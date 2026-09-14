import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '../interfaces/item.interface';
import { IItem2 } from '../interfaces/item2.interface';
import { ItemService } from '../services/item.service';
import { Item2Service } from '../services/item2.service';

  @Component({
    selector: 'app-item-manage-form',
    templateUrl: './item-manage-form.component.html',
    styleUrls: ['./item-manage-form.component.css'],
  })
export class ItemManageFormComponent implements OnInit {
  items: (IItem | IItem2)[] = [];
  itemType: number = 1;

  constructor(
    private itemService: ItemService,
    private item2Service: Item2Service,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemType = Number(params.get('itemType'));
      this.loadItems();
    });
  }

  ngOnInit(): void { }

  private loadItems() {
    if (this.itemType === 1) {
      this.itemService.getAllItems().subscribe((items) => {
        this.items = items;
      });
    } else if (this.itemType === 2) {
      this.item2Service.getAllItems2().subscribe((items2) => {
        this.items = items2;
      });
    }
  }

  deleteItem(itemId: number) {
    if (!confirm('Are you sure you want to delete the item?')) {
      return;
    }
    if (this.itemType === 1) {
      this.itemService.deleteItem(itemId).subscribe(() => {
        this.items = this.items.filter(i => i.id !== itemId);
      });
    } else {
      this.item2Service.deleteItem2(itemId).subscribe(() => {
        this.items = this.items.filter(i => i.id !== itemId);
      });
    }
  }
}