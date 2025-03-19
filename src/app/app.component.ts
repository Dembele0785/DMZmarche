import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DMZ';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  authenticated() {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }  /*
    protected readonly AuthService = AuthService  /*
    // Méthode pour savoir si on est sur la page de login
    isLoginPage(): boolean {
      return this.router.url === '/login';
    }*/
}
