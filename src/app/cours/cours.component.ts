import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours.model';
import {CoursService} from '../services/cours.service';
import {AuthService} from "../services/auth.service";
import {NgForOf} from '@angular/common';
@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  courss:Cours[] = []

  constructor(private coursService: CoursService, private auth: AuthService) {
  }

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
}

