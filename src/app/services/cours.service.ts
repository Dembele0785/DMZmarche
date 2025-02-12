import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cours} from '../model/cours.model';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8080/cours';

  constructor(private http: HttpClient) {
  }

  getCourss(): Observable<Cours[]> {
    let courss = this.http.get<Cours[]>(this.apiUrl);
    return courss;
  }
}
