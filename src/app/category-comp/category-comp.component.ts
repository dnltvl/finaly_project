import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '../interfaces/item.interface';
import { IItem2 } from '../interfaces/item2.interface';
import { ItemService } from '../services/item.service';
import { Item2Service } from '../services/item2.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-category-comp',
  templateUrl: './category-comp.component.html',
  styleUrls: ['./category-comp.component.css']
})
export class CategoryCompComponent implements OnInit {

  itemType!: number;
  items: (IItem | IItem2)[] = [];

  constructor(
    private itemService: ItemService,
    private item2Service: Item2Service,
    private activatedRoute: ActivatedRoute,
    public userService: UserService   // <-- הוספה, public כדי שה-HTML יוכל לגשת
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemType = Number(params.get('id'));

      if (this.itemType === 1) {
        this.itemService.getAllItems().subscribe((items: IItem[]) => {
          this.items = items;
        });
      } else if (this.itemType === 2) {
        this.item2Service.getAllItems2().subscribe((items2: IItem2[]) => {
          this.items = items2;
        });
      }
    });
  }
}