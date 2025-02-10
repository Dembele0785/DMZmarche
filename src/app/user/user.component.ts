import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users:User[]=[]

  constructor(private userService: UserService) {
  }
  ngOnInit():void{
    this.userService.getUser().subscribe((data:User[])=> {
      this.users = data;
    });
  }
}
