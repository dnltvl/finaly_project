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
    private settingsService: SettingsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.settingsService.loadSettings().subscribe();
    this.restoreSession();   // <-- חדש
  }

  private restoreSession() {
    const savedUserId = this.userService.getUserIdFromStorage();
    if (savedUserId === null) {
      return; // אין סשן שמור — לא מחובר
    }

    this.userService.getUserById(savedUserId).subscribe((user) => {
      this.userService.signedin$.next(true);
      this.userService.signedinAdmin$.next(user.userName === 'admin');
      this.userService.currentUserId$.next(user.id);
      this.userService.currentUserName$.next(`${user.firstName} ${user.lastName}`);
      this.userService.currentUserPurchases$.next(user.purchases ?? 0);

      this.bascetService.getBascetsByUserId(user.id).subscribe((bascets) => {
        this.bascetService.signedinBascet$.next(bascets.length > 0);
      });
    });
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.signedin$.next(false);
    this.userService.signedinAdmin$.next(false);
    this.userService.currentUserId$.next(null);
    this.userService.currentUserName$.next(null);
    this.userService.currentUserPurchases$.next(0);
    this.userService.clearUserIdFromStorage();
    this.bascetService.signedinBascet$.next(false);
    this.router.navigate(['']);
  }

  goBascet(event: Event) {
    event.preventDefault();
    const currentUserId = this.userService.currentUserId$.getValue();

    if (currentUserId === null) {
      alert('You need to log in first!');
      return;
    }

    this.router.navigate(['/BascetManage', currentUserId]);
  }
}