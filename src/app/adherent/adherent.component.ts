import {Component, OnInit} from '@angular/core';
import {AdherentService} from '../services/adherent.service';
import {Adherent} from '../model/adherent.model';
import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-adherent',
  standalone: true,
  imports: [],
  templateUrl: './adherent.component.html',
  styleUrl: './adherent.component.css'
})
export class AdherentComponent implements OnInit {
  adherents:Adherent[]=[]

  constructor(private adherentService: AdherentService, private auth: AuthService) {
  }

  authenticated() { return this.auth.authenticated; }

  ngOnInit():void{
    this.adherentService.getAdherents().subscribe((data:Adherent[])=> {
      this.adherents = data;
    });
  }
}
