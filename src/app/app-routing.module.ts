import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListcoursComponent} from './listcours/listcours.component';
import {SommaireComponent} from "./sommaire/sommaire.component";
import {EditionCoursComponent} from './edition-cours/edition-cours.component';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {ChapitreComponent} from './chapitre/chapitre.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {CreationCoursComponent} from './creation-cours/creation-cours.component';



const routes: Routes = [
  {path: 'cours', component: ListcoursComponent},
  {path: 'sommaire/:id', component: SommaireComponent},
  {path: 'chapitre/:idCours/:idModule/:agencementCh', component: ChapitreComponent},
  {path: 'editionCours/:id', component: EditionCoursComponent},
  {path: 'creationCours', component: CreationCoursComponent},
  {path: 'utilisateur', component: UtilisateurComponent},
  {path: 'chapitre/:id/:agencement', component: ChapitreComponent},
  {path: 'editionCours', component: EditionCoursComponent},
  {path: 'admin-user-list', component: AdminUserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
