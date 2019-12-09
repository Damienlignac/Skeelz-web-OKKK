import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListcoursComponent} from './listcours/listcours.component';
import {SommaireComponent} from "./sommaire/sommaire.component";
import {EditionCoursComponent} from './edition-cours/edition-cours.component';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {ChapitreComponent} from './chapitre/chapitre.component';
import {QcmComponent} from './qcm/qcm.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {CreationCoursComponent} from './creation-cours/creation-cours.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {PageAccueilComponent} from './page-accueil/page-accueil.component';
import {AppComponent} from './app.component';
import {TableauDeBordComponent} from './tableau-de-bord/tableau-de-bord.component';
import {EditionQcmComponent} from './edition-qcm/edition-qcm.component';



const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:PageAccueilComponent},
  {path: 'cours', component: ListcoursComponent, canActivate: [AuthGuard]},
  {path: 'sommaire/:id', component: SommaireComponent},
  {path: 'chapitre/:idCours/:idModule/:agencementCh', component: ChapitreComponent},
  {path: 'editionCours/:id', component: EditionCoursComponent},
  {path: 'editionQcm/:idCours/:idModule', component: EditionQcmComponent},
  {path: 'creationCours', component: CreationCoursComponent},
  {path: 'utilisateur', component: UtilisateurComponent},
  {path: 'qcm/:idCours/:idModule', component: QcmComponent},
  {path: 'admin-user-list', component: AdminUserListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: TableauDeBordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
