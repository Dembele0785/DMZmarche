import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {AuthService} from './services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DMZ';

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {
  }
  authenticated() {return this.auth.authenticated; }

  logout(){this.auth.logout();}

}
