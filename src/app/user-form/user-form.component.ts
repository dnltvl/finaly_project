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
export class UserFormComponent {
  constructor(private userService: UserService, private router: Router) {}

  siginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  signIn() {
    if (this.siginForm.invalid) return;
    const user: IUser = this.siginForm.value;
    this.userService.signIn(user);
    this.router.navigate(['']);
  }
}
