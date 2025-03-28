import { Routes } from '@angular/router';
import { AproposComponent } from './apropos/apropos.component';
import { CoursComponent } from './cours/cours.component';
import { InfosComponent } from './infos/infos.component';
import { LoginComponent } from './login/login.component';
import {AdherentComponent} from './adherent/adherent.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminGuard} from './guards/admin.guard';
import {ModifierCoursComponent} from './cours/ModifierCours/modifier-cours.component';
import {AjouterCoursComponent} from './cours/AjouterCours/ajouter-cours.component';

export const routes: Routes = [
  { path: 'cours', component: CoursComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adherent', component: AdherentComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'modifier-cours/:id', component: ModifierCoursComponent },
  {path:  'ajouter-cours', component: AjouterCoursComponent}


];
