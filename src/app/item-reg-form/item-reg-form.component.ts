import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { IItem } from '../interfaces/item.interface';

@Component({
  selector: 'app-item-reg-form',
  templateUrl: './item-reg-form.component.html',
  styleUrls: ['./item-reg-form.component.css'],
})
export class ItemRegFormComponent {
  allItems: IItem[] = [];

  itemForm: FormGroup = new FormGroup({
    pic: new FormControl(null, [Validators.required]),
    header: new FormControl(null, [Validators.required]),
    sub_header: new FormControl(null, [Validators.required]),
    paragraph: new FormControl(null, [Validators.required]),
    pic1: new FormControl(null, [Validators.required]),
    header1: new FormControl(null, [Validators.required]),
    paragraph1: new FormControl(null, [Validators.required]),
    qty: new FormControl(0, [Validators.required]),
    price: new FormControl(0, [Validators.required]),

  });

  constructor(private itemService: ItemService, private router: Router) {
    this.itemService.getAllItems().subscribe((items)=>{
      this.allItems = items;
    })
  }

  register() {
    var isTrue = false;
    if (this.itemForm.invalid) return;
    const newItem: IItem = this.itemForm.value;
    for (let i=0; i<this.allItems.length; i++){
      if (this.allItems[i].header === newItem.header) {
        isTrue = true;
      }
    }
    if(isTrue){
      alert("The item already exists!");
      return
    }
    this.itemService.createItem(newItem).subscribe();
    this.router.navigate(['']);
  }

    onFileSelected(event: any, field: string) {

    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // מעדכן את הנתיב שיישמר
    this.itemForm.patchValue({
      [field]: 'assets/' + file.name
    });
    // מציג תצוגה מקדימה
    const reader = new FileReader();

    reader.onload = () => {
      (this.itemForm as any)[field] = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
