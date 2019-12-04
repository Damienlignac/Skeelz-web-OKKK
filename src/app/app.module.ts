import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireComponent } from './stagiaire/stagiaire.component';
import { StagiaireFormComponent } from './stagiaire-form/stagiaire-form.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {AgePipe} from './age.pipe';
import { EvaluationComponent } from './evaluation/evaluation.component';
import {HttpClientModule} from '@angular/common/http';
import {AppConfigService} from './app-config.service';
import { SommaireComponent } from './sommaire/sommaire.component';

@NgModule({
  declarations: [
    AppComponent,
    StagiaireComponent,
    StagiaireFormComponent,
    HomeComponent,
    AgePipe,
    EvaluationComponent,
    SommaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
