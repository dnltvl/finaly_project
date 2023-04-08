import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usereg-form',
  templateUrl: './usereg-form.component.html',
  styleUrls: ['./usereg-form.component.css'],
})
export class UseregFormComponent {
  allUsers: IUser[] = [];

  signupForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {
    this.userService.getAllUsers().subscribe((users)=>{
      this.allUsers = users;
      console.log(this.allUsers)
    })
  }

  register() {
    if (this.signupForm.invalid) return;
    const newUser: IUser = this.signupForm.value;
    for(let i=0; i<this.allUsers.length; i++){
      if(this.allUsers[i].userName === newUser.userName) return;
      alert("The user already exists!")
    }
    this.userService.createUser(newUser).subscribe();
    localStorage.setItem('userName', newUser.userName);
    this.router.navigate(['']);
  }
}
