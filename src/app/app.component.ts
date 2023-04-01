import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLogIn = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.signIn$.subscribe((signIn) => {
      this.isLogIn = signIn;
    });
    console.log(this.isLogIn);
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('userName');
    this.isLogIn = false;
  }
}
