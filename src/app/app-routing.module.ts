import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListcoursComponent} from './listcours/listcours.component';
import {SommaireComponent} from "./sommaire/sommaire.component";
import {EditionCoursComponent} from './edition-cours/edition-cours.component';



const routes: Routes = [
  {path: 'cours', component: ListcoursComponent},
  {path: 'sommaire/:id', component: SommaireComponent},
  {path: 'chapitre/:id/:agencement', component: ChapitreComponent},
  {path: 'editionCours', component: EditionCoursComponent},
  {path: 'utilisateur', component: UtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
