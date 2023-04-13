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
  signedin$!: BehaviorSubject<boolean | null>;

  constructor(private userService: UserService, private router: Router) {
    this.signedin$ = this.userService.signedin$;
    // console.log(this.signedin$);
  }

  ngOnInit() {
    this.userService.signedin$.subscribe(() => {
      this.signedin$ = this.userService.signedin$;
    });
    // console.log(`on init ${this.signedin$.getValue()}`);
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('userName');
    this.signedin$.next(false);
    // console.log(`on logout ${this.signedin$.getValue()}`);
    this.router.navigate(['']);
  }
}
