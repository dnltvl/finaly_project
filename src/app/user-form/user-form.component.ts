import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private router: Router) {}

  siginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  signIn() {
    // console.log(this.siginForm);
    const user: IUser = this.siginForm.value;
    console.log(user);

    console.log(this.users);
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].userName === user.userName &&
        this.users[i].password === user.password
      ) {
        console.log(true);
        localStorage.setItem('userName', user.userName);
        this.router.navigate([''], { queryParams: { isLoggedIn: true } });
      }
    }
  }
}
