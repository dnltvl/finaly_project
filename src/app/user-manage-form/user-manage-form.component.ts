import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-manage-form',
  templateUrl: './user-manage-form.component.html',
  styleUrls: ['./user-manage-form.component.css'],
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
