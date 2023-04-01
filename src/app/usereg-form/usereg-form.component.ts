import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usereg-form',
  templateUrl: './usereg-form.component.html',
  styleUrls: ['./usereg-form.component.css'],
})
export class UseregFormComponent {
  // allUsers: IUser[] = [];

  signupForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  register() {
    const newUser: IUser = this.signupForm.value;
    this.userService.createUser(newUser).subscribe();
    localStorage.setItem('userName', newUser.userName);
    this.router.navigate(['']);
  }
}
