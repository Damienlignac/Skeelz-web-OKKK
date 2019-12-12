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
  utilisateurs: Array<Utilisateur>;
  skeelzarray: Array<Skeelz>;
  idSkeelz: number;
  personneSkeelz: Array<Personne> = new Array<Personne>();
  newpersonne: Personne = new Personne();
  newutilisateur: Utilisateur = new Utilisateur();
  listentreprise: Array<Entreprise>;

  constructor(private adminUserListService: AdminUserListHttpService, private http: HttpClient, private appConfigService: AppConfigService) {
    this.listuser()
    this.list();
    this.chargeentreprise();
  }


  ngOnInit() {

  }

  list(): any {
    this.personnes = this.adminUserListService.findAll();
       return this.personnes;
  }
  listuser(){
    this.utilisateurs = this.adminUserListService.findAllUtilisateur();
    return this.utilisateurs;
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
    console.log(this.newpersonne);
    console.log(this.newutilisateur);
    this.http.post(this.appConfigService.backEnd + 'utilisateur', this.newutilisateur).subscribe(resp => {
      this.newpersonne.utilisateur = <Utilisateur> resp;
      console.log(resp);
      this.http.post(this.appConfigService.backEnd + 'personne', this.newpersonne).subscribe(resp => {
        this.newpersonne = <Personne> resp;
        console.log(resp);
        this.adminUserListService.load();
        console.log(this.list());
        this.reset();
        this.newutilisateur=new Utilisateur();
        this.newpersonne = new Personne();
        return

      });

    });


  }

  reset() {

    this.newpersonne.nom = '';
    this.newpersonne.prenom = '';
    this.newpersonne.telephone = '';
    this.newutilisateur.mail = '';
    this.newutilisateur.identifiant = '';
    this.newutilisateur.password = '';
    this.newutilisateur.entreprise = new Entreprise();
    this.newutilisateur.rh = false;
    this.newutilisateur.administrateur = false;
  }
}
