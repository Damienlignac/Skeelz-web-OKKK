import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {AuthGuard} from './auth.guard';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { EcranAdminComponent } from './ecran-admin/ecran-admin.component';
import {EditionQcmComponent} from './edition-qcm/edition-qcm.component';
import { SectionTableauDeBordComponent } from './section-tableau-de-bord/section-tableau-de-bord.component';
import { EditionUtilisateurComponent } from './edition-utilisateur/edition-utilisateur.component';
import { EditionSkeelzComponent } from './edition-skeelz/edition-skeelz.component';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

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
    PageAccueilComponent,
    TableauDeBordComponent,
    EcranAdminComponent,
    EditionQcmComponent,
    SectionTableauDeBordComponent,
    EditionUtilisateurComponent,
    EditionSkeelzComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AppConfigService, AdminUserListHttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {


}
