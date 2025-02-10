import { Routes } from '@angular/router';
import { AproposComponent } from './apropos/apropos.component';
import { CoursComponent } from './cours/cours.component';
import { InfosComponent } from './infos/infos.component';
import { LoginComponent } from './login/login.component';
import {UserComponent} from './user/user.component';

export const routes: Routes = [
  { path: 'cours', component: CoursComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent},
  { path: '', redirectTo: 'user', pathMatch: 'full' }, // Redirection par défaut vers la page de login

];
