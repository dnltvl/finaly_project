import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit() {}

  logout(event: Event) {
    event.preventDefault();
    this.userService.signedin$.next(false);
    this.router.navigate(['']);
  }
}
