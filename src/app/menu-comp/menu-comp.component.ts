import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Route, Router } from '@angular/router';
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
  constructor(private userService: UserService, private router: Router) {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }
  ngOnInit(): void {
    console.log(this.allUsers);
    if (localStorage.getItem('userName') != null) {
      console.log('is not equal null');
      this.isLogIn = true;
    }
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('userName');
    this.isLogIn = false;
  }
}
