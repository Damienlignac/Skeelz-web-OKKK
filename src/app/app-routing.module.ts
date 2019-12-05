import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListcoursComponent} from './listcours/listcours.component';
import {SommaireComponent} from "./sommaire/sommaire.component";
import {ChapitreComponent} from './chapitre/chapitre.component';



const routes: Routes = [
  {path: 'cours', component: ListcoursComponent},
  {path: 'sommaire/:id', component: SommaireComponent},
  {path: 'chapitre/:id/:agencement', component: ChapitreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
