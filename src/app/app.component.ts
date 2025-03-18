import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';

import {AuthService} from './services/auth.service';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DMZ';

  constructor(
    protected auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  authenticated() {return this.auth.authenticated; }

  logout(){this.auth.logout();}
  /*
    protected readonly AuthService = AuthService  /*
    // Méthode pour savoir si on est sur la page de login
    isLoginPage(): boolean {
      return this.router.url === '/login';
    }*/
}
