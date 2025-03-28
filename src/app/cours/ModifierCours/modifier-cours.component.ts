import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from '../../model/cours.model';
import { CoursService } from '../../services/cours.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modifier-cours',
  templateUrl: './modifier-cours.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './modifier-cours.component.css'
})
export class ModifierCoursComponent implements OnInit {
  cours: Cours = { id: 0, nom: '', prof: '', image: '' ,salle:''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.coursService.getCoursById(id).subscribe({
        next: (data) => (this.cours = data),
        error: () => alert('❌ Erreur : Impossible de charger le cours')
      });
    }
  }

  enregistrerModification(): void {
    this.coursService.updateCours(this.cours.id, this.cours).subscribe({
      next: () => {
        alert('✅ Cours modifié avec succès !');
        this.router.navigate(['/cours']);
      },
      error: () => alert('❌ Erreur : Modification échouée')
    });
  }

  annuler(): void {
    this.router.navigate(['/cours']);
  }
}
