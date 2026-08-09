import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reg-form',
  templateUrl: './user-reg-form.component.html',
  styleUrls: ['./user-reg-form.component.css'],
})
export class UseregFormComponent {
  allUsers: IUser[] = [];
  showPassword: boolean = false;

  signupForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/)
    ]),
    purchases: new FormControl(0),
  });

  constructor(private userService: UserService, private router: Router) {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    var isTrue = false;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const newUser: IUser = this.signupForm.value;
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].userName === newUser.userName) {
        isTrue = true;
      }
    }
    if (isTrue) {
      alert("The user already exists!");
      return
    }
    this.userService.createUser(newUser).subscribe((createdUser) => {
      // "מתחברים" את המשתמש החדש אוטומטית לאחר ההרשמה
      this.userService.signedin$.next(true);
      this.userService.signedinAdmin$.next(false); // משתמש חדש לעולם לא admin
      this.userService.currentUserId$.next(createdUser.id);
      this.userService.currentUserName$.next(`${createdUser.firstName} ${createdUser.lastName}`);
      this.userService.currentUserPurchases$.next(createdUser.purchases ?? 0);

      this.router.navigate(['']);
    });
  }
}