import { Routes } from '@angular/router';
import { AproposComponent } from './apropos/apropos.component';
import { CoursComponent } from './cours/cours.component';
import { InfosComponent } from './infos/infos.component';
import { LoginComponent } from './login/login.component';
import {AdherentComponent} from './adherent/adherent.component';

export const routes: Routes = [
  { path: 'cours', component: CoursComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adherent', component: AdherentComponent},
  //{ path: '', redirectTo: 'user', pathMatch: 'full' }, // Redirection par défaut vers la page de login

];
