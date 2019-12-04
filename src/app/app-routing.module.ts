import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StagiaireComponent} from './stagiaire/stagiaire.component';
import {HomeComponent} from './home/home.component';
import {EvaluationComponent} from './evaluation/evaluation.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stagiaire', component: StagiaireComponent},
  {path: 'evaluation', component: EvaluationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
