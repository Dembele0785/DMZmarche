import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';
import {NgForOf} from '@angular/common';
import {Observable} from 'rxjs';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = []; // Liste des utilisateurs à afficher

  constructor(private userService: UserService, protected router: Router) {}

  ngOnInit(): void {
    this.loadUsers(); // Charger les utilisateurs au démarrage du composant
  }

  // Charger les utilisateurs avec rôle ADHERENT
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users; // Assigner les utilisateurs avec le rôle ADHERENT à la variable `users`
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err); // Gérer les erreurs
      }
    });
  }

  modifierAdherent(id: number) {
    this.router.navigate(['/modifier-adherent', id]);
  }

  supprimerAdherent(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce cours ?")) {
      this.userService.supprimerAdherent(id).subscribe({
        next: () => {
          this.users = this.users.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error("❌ Erreur lors de la suppression du cours :", err);
        }
      });
    }
  }

}
