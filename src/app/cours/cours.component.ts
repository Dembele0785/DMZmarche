import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours.model';
import {CoursService} from '../services/cours.service';
@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  courss:Cours[] = []

  constructor(private coursService: CoursService) {
  }

  ngOnInit(): void {
    this.coursService.getCourss().subscribe((data: Cours[]) => {
      this.courss = data;
    });
  }
}
