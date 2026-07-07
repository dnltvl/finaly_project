import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-usermanage-form',
  templateUrl: './usermanage-form.component.html',
  styleUrls: ['./usermanage-form.component.css'],
})
export class UserManageFormComponent implements OnInit {
  users: IUser[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users)=>{
      this.users = users;
    })
  }

deleteUser(userId: number){
    this.userService.deleteUser(userId).subscribe(()=>{
      this.users = this.users.filter(u => u.id !== userId);
    });
  }
}
