import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';
import {NgForOf} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [
    NgForOf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = []; // Liste des utilisateurs à afficher

  constructor(private userService: UserService) {}

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
}
