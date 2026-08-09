import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { BascetService } from './services/bascet.service';
import { SettingsService } from './services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    public userService: UserService,
    public bascetService: BascetService,
    private settingsService: SettingsService,   // <-- הוספה
    private router: Router
  ) {
  }

  ngOnInit() {
    this.settingsService.loadSettings().subscribe();   // טוען פעם אחת בהפעלת האתר
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.signedin$.next(false);
    this.userService.signedinAdmin$.next(false);
    this.userService.currentUserId$.next(null);
    this.userService.currentUserName$.next(null);
    this.userService.currentUserPurchases$.next(0);
    this.bascetService.signedinBascet$.next(false);
    this.router.navigate(['']);
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