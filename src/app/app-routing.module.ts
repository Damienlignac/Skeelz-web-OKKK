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
import {EcranAdminComponent} from './ecran-admin/ecran-admin.component';
import {AdminCoursAValiderListComponent} from './admin-cours-avalider-list/admin-cours-avalider-list.component';
import {TableauDeBordComponent} from './tableau-de-bord/tableau-de-bord.component';
import {EditionQcmComponent} from './edition-qcm/edition-qcm.component';
import {SectionTableauDeBordComponent} from './section-tableau-de-bord/section-tableau-de-bord.component';
import {EditionUtilisateurComponent} from './edition-utilisateur/edition-utilisateur.component';



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
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: EcranAdminComponent, outlet: 'primary', children: [
      {path: '', component: AdminUserListComponent, outlet: 'outsup'},
      {path: '', component: AdminCoursAValiderListComponent, outlet: 'outinf'}
    ]},
  {path: 'dashboard', component: TableauDeBordComponent},
  {path: 'dashboard/skeelz', component: SectionTableauDeBordComponent},
  {path: 'edition-utilisateur', component: EditionUtilisateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
