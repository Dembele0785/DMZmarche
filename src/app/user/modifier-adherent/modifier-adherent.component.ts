import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { User } from '../../model/user.model';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-modifier-adherent',
  templateUrl: './modifier-adherent.component.html',
  imports: [
    FormsModule,

  ],
  styleUrl: './modifier-adherent.component.css'
})
export class ModifierUserComponent implements OnInit {
  user: User = { id: 0,nom :'', prenom:'', role:'', email: '', username: '', password: ''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id'); // Récupère l'ID sous forme de string
    const id = idString ? Number(idString) : null; // Convertit en number si non null

    if (id !== null && !isNaN(id)) {
      this.userService.getUserById(id).subscribe({
        next: (data) => (this.user = data),
        error: () => alert('❌ Erreur : Impossible de charger le user')
      });
    } else {
      alert('❌ Erreur : ID invalide');
    }
  }


  enregistrerModification(): void {
    const userId = Number(this.user.id); // Force la conversion

    if (!isNaN(userId)) {
      this.userService.updateAdherent(userId, this.user).subscribe({
        next: () => {
          alert('✅ Utilisateur modifié avec succès !');
          this.router.navigate(['/users']);
        },
        error: () => alert('❌ Erreur : Modification échouée')
      });
    } else {
      alert('❌ Erreur : ID utilisateur invalide');
    }
  }


  annuler(): void {
    this.router.navigate(['/users']);
  }
}

