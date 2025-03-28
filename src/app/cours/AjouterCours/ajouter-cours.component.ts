import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cours } from '../../model/cours.model';
import { CoursService } from '../../services/cours.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ajouter-cours',
  templateUrl: './ajouter-cours.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './ajouter-cours.component.css'
})
export class AjouterCoursComponent {
  nouveauCours: Cours = { id: 0, nom: '', prof: '', image: '', salle:'' };

  constructor(private coursService: CoursService, private router: Router) {}

  ajouterCours(): void {
    this.coursService.ajouterCours(this.nouveauCours).subscribe({
      next: () => {
        alert('✅ Cours ajouté avec succès !');
        this.router.navigate(['/cours']);
      },
      error: () => alert('❌ Erreur : Ajout échoué')
    });
  }
  annuler(): void {
    this.router.navigate(['/cours']);
  }
}

