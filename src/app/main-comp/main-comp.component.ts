import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-comp',
  templateUrl: './main-comp.component.html',
  styleUrls: ['./main-comp.component.css'],
})
export class MainCompComponent implements OnInit {
  isLogIn!: boolean;

  constructor() {}

  ngOnInit() {
    console.log(this.isLogIn);
    const val = localStorage;
    console.log(val.getItem('userName'));
    if (val.getItem('userName') != null) {
      this.isLogIn = true;
      console.log(val);
    }
    console.log(this.isLogIn);
  }
}
