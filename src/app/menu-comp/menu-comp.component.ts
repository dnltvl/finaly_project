import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu-comp',
  templateUrl: './menu-comp.component.html',
  styleUrls: ['./menu-comp.component.css'],
})
export class MenuCompComponent implements OnInit {
  allUsers: IUser[] = [];
  isLogIn = false;
  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }
  ngOnInit(): void {
    console.log(this.allUsers);
    const val = localStorage;
    if (val.getItem('userName') === 'ascx') {
      this.isLogIn = true;
    }
    console.log(val);
  }
}
