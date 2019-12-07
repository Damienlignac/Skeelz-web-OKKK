import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppConfigService} from './app-config.service';
import { SommaireComponent } from './sommaire/sommaire.component';
import { ChapitreComponent } from './chapitre/chapitre.component';
import { ListcoursComponent } from './listcours/listcours.component';
import { EditionCoursComponent } from './edition-cours/edition-cours.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { EnumArrayPipe } from './enum-array.pipe';
import { QcmComponent } from './qcm/qcm.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {AdminUserListHttpService} from './admin-user-list/admin-user-list-http.service';
import { AdminCoursAValiderListComponent } from './admin-cours-avalider-list/admin-cours-avalider-list.component';
import { LoginComponent } from './login/login.component';
import {CreationCoursComponent} from './creation-cours/creation-cours.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    SommaireComponent,
    ChapitreComponent,
    ListcoursComponent,
    EditionCoursComponent,
    UtilisateurComponent,
    EnumArrayPipe,
    QcmComponent,
    AdminUserListComponent,
    AdminCoursAValiderListComponent,
    LoginComponent,
    CreationCoursComponent,
    PageAccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AppConfigService, AdminUserListHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
