import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { BascetService } from '../services/bascet.service';
import { IBascet } from '../interfaces/bascet.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: IUser[] = [];
  bascet: IBascet[] = [];
  userIdStat: number = 0;
  showPassword: boolean = false;

  constructor(private userService: UserService, private bascetService: BascetService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.user = users;
    });
    this.bascetService.getAllBascets().subscribe((bascets) => {
      this.bascet = bascets;
    });
  }

  siginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/)
    ]),
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signIn() {
    if (this.siginForm.invalid) {
      this.siginForm.markAllAsTouched();
      return;
    }
    var isTrue = false, aTrue = false, bTrue = false;
    const user: IUser = this.siginForm.value;
    for (let i = 0; i < this.user.length; i++) {
      if (
        this.user[i].userName.toLowerCase() === user.userName.toLowerCase() &&
        this.user[i].password === user.password
      ) {
        isTrue = true;
        this.userIdStat = this.user[i].id
        if (this.user[i].userName === 'admin') {
          aTrue = true;
        }
        for (let i = 0; i < this.bascet.length; i++) {
          if (
            this.bascet[i].userId === this.userIdStat
          ) {
            bTrue = true;
          }
        }
        this.userService.signedin$.next(isTrue);
        this.userService.signedinAdmin$.next(aTrue);
        this.userService.currentUserId$.next(this.userIdStat);
        this.bascetService.signedinBascet$.next(bTrue);
        this.userService.currentUserPurchases$.next(this.user[i].purchases ?? 0);
        this.userService.currentUserId$.next(this.userIdStat);
        this.userService.currentUserName$.next(`${this.user[i].firstName} ${this.user[i].lastName}`);  // <-- חדש 
      }
    }
    if (!isTrue) {
      alert('The user or password is incorrect!');
      return;
    }
    this.router.navigate(['']);
  }
  logout(event: Event) {
    event.preventDefault();
      this.userService.signedin$.next(false);
      this.userService.signedinAdmin$.next(false);
      this.userService.currentUserId$.next(null);
      this.userService.currentUserName$.next(null);  // <-- חדש
      this.bascetService.signedinBascet$.next(false);
      this.router.navigate(['']);
  }
}