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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.signedin$.subscribe((signIn) => {
      this.signedin$ = this.userService.signedin$;
    });
    console.log(this.signedin$);
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('userName');
    this.userService.signedin$.subscribe(() => {
      this.userService.signedin$.next(false),
        this.userService.signedin$.complete();
    });
    this.router.navigate(['']);
  }
}
