import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermanage-form',
  templateUrl: './usermanage-form.component.html',
  styleUrls: ['./usermanage-form.component.css'],
})
export class UserManageFormComponent {
}
