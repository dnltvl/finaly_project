import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IItem } from '../interfaces/item.interface';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-update-form',
  templateUrl: './item-update-form.component.html',
  styleUrls: ['./item-update-form.component.css'],
})
export class ItemUpdateFormComponent implements OnInit {

  itemId!: number;

  item:IItem = Object({
      id: null,
      pic: "",
      header: "",
      sub_header: "",
      paragraph: "",
      pic1: "",
      header1: "",
      paragraph1: "",
      qty: 0,
      price: 0,}
      )

  UpdForm: FormGroup = new FormGroup({
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

  constructor(private itemService: ItemService, private activatedRoute : ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.itemId = Number(params.get("itemId")));
    this.itemService.getItemById(this.itemId+1).subscribe(item => {
      this.item = item;
      this.UpdForm.patchValue({
        pic: this.item.pic,
        header: this.item.header,
        sub_header: this.item.sub_header,
        paragraph: this.item.paragraph,
        pic1: this.item.pic1,
        header1: this.item.header1,
        paragraph1: this.item.paragraph1,
        qty: this.item.qty,
        price: this.item.price,
      });
    });
  }

  update() {
    if (this.UpdForm.invalid) return;
    const updItem: IItem = this.UpdForm.value;
    updItem.id = this.item.id;
    this.itemService.updateItem(updItem).subscribe();
    this.router.navigate(["/ItemManage/1"]);
  }

  onFileSelected(event: any, field: string) {

    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // מעדכן את הנתיב שיישמר
    this.UpdForm.patchValue({
      [field]: 'assets/' + file.name
    });
    // מציג תצוגה מקדימה
    const reader = new FileReader();

    reader.onload = () => {
      (this.item as any)[field] = reader.result;
    };

    reader.readAsDataURL(file);
  }
}