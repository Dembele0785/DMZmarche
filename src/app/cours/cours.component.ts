import { Component, OnInit } from '@angular/core';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';
import { AuthService } from "../services/auth.service";
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  courss: Cours[] = [];

  constructor(
    private coursService: CoursService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursService.getCourss().subscribe({
      next: (data) => {
        this.courss = data;
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement des cours :", err);
      }
    });
  }

  trackById(index: number, cours: any): number {
    return cours.id;
  }

  ajouterCours() {
    this.router.navigate(['/ajouter-cours']);
  }

  modifierCours(id: number) {
    this.router.navigate(['/modifier-cours', id]);
  }

  supprimerCours(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce cours ?")) {
      this.coursService.supprimerCours(id).subscribe({
        next: () => {
          this.courss = this.courss.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error("❌ Erreur lors de la suppression du cours :", err);
        }
      });
    }
  }

  inscrireCours(id: number): void {
    this.coursService.inscriptionCours(id).subscribe({
      next: () => alert('✅ Inscription réussie !'),
      error: () => alert('❌ Erreur lors de l\'inscription.')
    });
  }


  isAdmin(): boolean {
    return this.auth.getRole() === 'ADMIN'; // ⚠️ Remplace 'ADMIN' par la valeur réelle de ton rôle admin dans la BDD
  }
}
