import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from '../../model/cours.model';
import { CoursService } from '../../services/cours.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-modifier-cours',
  templateUrl: './modifier-cours.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrl: './modifier-cours.component.css'
})
export class ModifierCoursComponent implements OnInit {
  cours: Cours = { id: 0, nom: '', prof: '', image: '' ,salle:''};

  images = [
    { name: 'Football', path: 'assets/foot.png' },
    { name: 'Basketball', path: 'assets/baskette.png' },
    { name: 'Tennis', path: 'assets/tenis.png' },
    { name: 'Natation', path: 'assets/natation.png' },
    { name: 'Musique', path: 'assets/musique.png' },
    { name: 'Art Plastique', path: 'assets/artplastique.png' }
  ];

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
