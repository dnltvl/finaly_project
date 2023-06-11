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

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  siginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  signIn() {
    if (this.siginForm.invalid) return;
    var isTrue = false;
    const user: IUser = this.siginForm.value;
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].userName.toLowerCase() === user.userName.toLowerCase() &&
        this.users[i].password === user.password
      ) {
        isTrue = true;
        this.userService.signedin$.next(isTrue);
      }
    }
    if (!isTrue) {
      alert('The user or password is incorrect!');
      return;
    }
    this.router.navigate(['']);
  }
}
