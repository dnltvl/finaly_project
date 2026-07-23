import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css'],
})
export class UserUpdateFormComponent implements OnInit {

  userId!: number;

  user:IUser = Object({
      id: null,
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      purchases: null,}
      )

  UpdForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    purchases: new FormControl(0, [Validators.required]),
  });

  constructor(private userService: UserService, private activatedRoute : ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.userId = Number(params.get("userId")));
    this.userService.getUserById(this.userId+1).subscribe(user => {
      this.user = user;
      this.UpdForm.patchValue({
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        purchases: this.user.purchases,
      });
    });
  }

  update() {
    if (this.UpdForm.invalid) return;
    const updUser: IUser = this.UpdForm.value;
    updUser.id = this.user.id;
    this.userService.editUser(updUser).subscribe();
    this.router.navigate(["/UserManage"]);
  }
}