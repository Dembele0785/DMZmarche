import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ajouter-adherent',
  templateUrl: './ajouter-adherent.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./ajouter-adherent.component.css']
})
export class AjouterAdherentComponent {
  // Initialisation de l'objet pour le nouvel adhérent
  nouveauAdherent: User = { id: 0,nom :'', prenom:'', role: 'ADHERENT', email: '', username: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Fonction d'ajout de l'adhérent
  ajouterAdherent(): void {
    this.userService.addUser(this.nouveauAdherent).subscribe({
      next: () => {
        alert('✅ Adhérent ajouté avec succès !');
        this.router.navigate(['/users']);  // Rediriger vers la page des utilisateurs
      },
      error: () => alert('❌ Erreur : Ajout échoué')
    });
  }

  // Fonction pour annuler l'ajout et retourner à la liste des utilisateurs
  annuler(): void {
    this.router.navigate(['/users']);
  }
}
