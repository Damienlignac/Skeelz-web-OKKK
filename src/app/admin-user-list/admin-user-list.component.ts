import {Component, OnInit} from '@angular/core';
import {Personne} from '../model/personne';
import {AdminUserListHttpService} from './admin-user-list-http.service';
import {Skeelz} from '../model/skeelz';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Entreprise} from '../model/entreprise';
import {UtilisateurComponent} from '../utilisateur/utilisateur.component';
import {Utilisateur} from '../model/utilisateur';

@Component({
  selector: 'app-personne',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  personne: Personne = null;
  personnes: Array<Personne>;
  skeelzarray: Array<Skeelz>;
  idSkeelz: number;
  personneSkeelz: Array<Personne> = new Array<Personne>();
  newpersonne: Personne = new Personne();
  newutilisateur: Utilisateur = new Utilisateur();
  listentreprise: Array<Entreprise>;

  constructor(private adminUserListService: AdminUserListHttpService, private http: HttpClient, private appConfigService: AppConfigService) {
    this.list();
    this.chargeentreprise();
  }


  ngOnInit() {

  }

  list(): any {
    this.personnes = this.adminUserListService.findAll();
    return this.personnes;
  }

  chargeskeelzs() {
    this.skeelzarray = this.adminUserListService.findAllSkeelz();
    return this.skeelzarray;
  }

  chargeentreprise() {
    this.http.get(this.appConfigService.backEnd + 'entreprise').subscribe(resp => {
      this.listentreprise = <Array<Entreprise>> resp;
    });
  }

  filtreskeelz() {
    this.adminUserListService.findBySkeelz(this.idSkeelz).subscribe(resp => {
      this.personneSkeelz = resp;
      console.log(this.personneSkeelz);
      return this.personneSkeelz;
    });
  }

  savepersonne() {
    this.newpersonne.utilisateur = this.newutilisateur;
    console.log(this.newpersonne);
    this.http.post(this.appConfigService.backEnd + 'utilisateur', this.newutilisateur).subscribe(resp => {
      this.newutilisateur = <Utilisateur> resp;
      console.log(resp);
      this.http.post(this.appConfigService.backEnd + 'personne', this.newpersonne).subscribe(resp => {
        this.newpersonne = <Personne> resp;
        return this.list();

      });

    });


  }


}
