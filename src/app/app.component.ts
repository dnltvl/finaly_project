import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { BascetService } from './services/bascet.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public userService: UserService, public bascetService: BascetService, private router: Router) {
  }

  ngOnInit() {}

  logout(event: Event) {
    event.preventDefault();
    this.userService.signedin$.next(false);
    this.bascetService.signedinBascet$.next(false);
    this.router.navigate(['']);
    this.userService.currentUserPurchases$.next(0);
  }

  goBascet(event: Event) {
    event.preventDefault();
    const currentUserId = this.userService.currentUserId$.getValue();
    if (currentUserId === null) {
      alert('עליך להתחבר תחילה');
      return;
    }
    this.router.navigate(['/BascetManage', currentUserId]);
  }

}
