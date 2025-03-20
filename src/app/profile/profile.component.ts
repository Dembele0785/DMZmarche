import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';  // Update the service name
import { User } from '../model/user.model';  // Update the model import
import { AuthService } from "../services/auth.service";
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',  // Update the component selector
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',  // Update the template name
  styleUrl: './profile.component.css'  // Update the style name
})
export class ProfileComponent implements OnInit {  // Update the class name
  user: User | null = null;  // Stocke un seul utilisateur

  constructor(private userService: UserService, private auth: AuthService, ) {
  }

  authenticated() { return this.auth.authenticated; }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data: User) => {
      this.user = data;
    });
  }
  logout(): void {
    this.auth.logout();
  }
}
