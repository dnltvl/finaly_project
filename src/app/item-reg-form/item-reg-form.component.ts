import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item2Service } from '../services/item2.service';
import { IItem } from '../interfaces/item.interface';
import { IItem2 } from '../interfaces/item2.interface';

@Component({
  selector: 'app-item-reg-form',
  templateUrl: './item-reg-form.component.html',
  styleUrls: ['./item-reg-form.component.css'],
})
export class ItemRegFormComponent {
  allItems: IItem[] = [];
  allItems2: IItem2[] = [];

  itemForm: FormGroup = new FormGroup({
    category: new FormControl('0', [Validators.required, Validators.pattern(/^[12]$/)]), // <-- חדש
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

  constructor(
    private itemService: ItemService,
    private item2Service: Item2Service,
    private router: Router
  ) {
    this.itemService.getAllItems().subscribe((items) => {
      this.allItems = items;
    })
    this.item2Service.getAllItems2().subscribe((items2) => {
      this.allItems2 = items2;
    })
  }

  register() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const formValue = this.itemForm.value;
    const category = formValue.category;

    // מוציאים את category מהאובייקט לפני השמירה (הוא לא שדה אמיתי ב-DB)
    const { category: _omit, ...itemData } = formValue;

    if (category === '1') {
      const isDuplicate = this.allItems.some(item => item.header === itemData.header);
      if (isDuplicate) {
        alert("The item already exists!");
        return;
      }
      this.itemService.createItem(itemData as IItem).subscribe();
    } else if (category === '2') {
      const isDuplicate = this.allItems2.some(item => item.header === itemData.header);
      if (isDuplicate) {
        alert("The item already exists!");
        return;
      }
      this.item2Service.createItem2(itemData as IItem2).subscribe();
    }

    this.router.navigate(['']);
  }

  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.itemForm.patchValue({
      [field]: 'assets/' + file.name
    });
    const reader = new FileReader();
    reader.onload = () => {
      (this.itemForm as any)[field] = reader.result;
    };
    reader.readAsDataURL(file);
  }
}