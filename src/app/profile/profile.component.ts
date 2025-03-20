import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';  // Update the service name
import { User } from '../model/user.model';  // Update the model import
import { AuthService } from "../services/auth.service";
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',  // Update the component selector
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',  // Update the template name
  styleUrl: './profile.component.css'  // Update the style name
})
export class ProfileComponent implements OnInit {  // Update the class name
  user: User | null = null;  // Stocke un seul utilisateur
  isEditing = false;
  editedUser: Partial<User> = {};  // Contient les données modifiées


  constructor(private userService: UserService, private auth: AuthService, ) {
  }

  authenticated() { return this.auth.authenticated; }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data: User) => {
        this.user = data;
        this.editedUser = { ...data }; // Copie des données pour modification
      },
      error: (err) => console.error("Erreur de récupération de l'utilisateur :", err)
    });
  }
  logout(): void {
    this.auth.logout();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user) {
      this.editedUser = { ...this.user }; // Réinitialise les valeurs
    }
  }

  saveProfile(): void {
    if (!this.user) return;

    this.userService.updateUser(String(this.user.id), this.editedUser).subscribe({
      next: (response) => {
        console.log("Utilisateur mis à jour avec succès !", response);
        this.user = { ...this.editedUser } as User;
        this.isEditing = false;
        alert("Profil mis à jour !");
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
        alert("Échec de la mise à jour !");
      }
    });
  }
}
