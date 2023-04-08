import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  users: IUser[] = [];
  signedin$ = new BehaviorSubject<boolean | null>(null);
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }

  siginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  signIn() {
    if (this.siginForm.invalid) return;
    var isTrue = false;
    console.log('Form is valid');
    const user: IUser = this.siginForm.value;
    console.log(user);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userName === user.userName && this.users[i].password === user.password) {
        console.log('User and password true');
        isTrue = true;
        this.userService.signedin$.next(true);
      }
    }
    if(!isTrue){
      alert("The user or password is incorrect!");
      return
    }
    this.router.navigate(['']);
  }
}
