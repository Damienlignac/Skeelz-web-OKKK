import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilisateurHttpService} from '../utilisateur/utilisateur-http.service';
import {Personne} from '../model/personne';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {TableauDeBordHttpService} from '../tableau-de-bord/tableau-de-bord-http-service';
import {CompetenceSkeelz} from '../model/competenceSkeelz';
import {Skeelz} from '../model/skeelz';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.css']
})
export class EditionUtilisateurComponent implements OnInit {

  idUtilisateur: number;
  currentPersonne: Personne;

  newMail: string;
  newIdentifiant: string;
  newTelephone: string;

  wrongPassword: boolean;
  unmatchPassword: boolean;
  succeedNewPassword: boolean;

  oldPassword: string;
  newPassword: string;
  confirmedNewPassword: string;

  competenceSkeelz: Array<CompetenceSkeelz>;
  mesSkeelzUniques: Array<Skeelz>;
  listeScoreSkeelz: Array<number>;

  constructor(private route: ActivatedRoute, private utilisateurHttpService: UtilisateurHttpService, private http: HttpClient,
              private appConfigService: AppConfigService, private tableauDeBordHttpService: TableauDeBordHttpService) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      console.log(this.currentPersonne);
      console.log(this.currentPersonne.utilisateur);
      this.listSkeelz();
    });
    this.resetForm();
  }

  ngOnInit() {
  }

  changeMail (newMail: string){
    this.currentPersonne.utilisateur.mail = this.newMail;
    this.http.put(this.appConfigService.backEnd + 'utilisateur/' + this.idUtilisateur, this.currentPersonne.utilisateur).subscribe(resp => {
      this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
        this.currentPersonne = resp;
        console.log(this.currentPersonne.utilisateur);
        this.resetForm();
      });
    })
  }

  changeIdentifiant (newIdentifiant: string){
    this.currentPersonne.utilisateur.identifiant = this.newIdentifiant;
    this.http.put(this.appConfigService.backEnd + 'utilisateur/' + this.idUtilisateur, this.currentPersonne.utilisateur).subscribe(resp => {
      this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
        this.currentPersonne = resp;
        this.resetForm();
      });
    })
  }

  changeTelephone (newTelephone: string) {
    this.currentPersonne.telephone = this.newTelephone;
    this.http.put(this.appConfigService.backEnd + 'personne/' + this.currentPersonne.id, this.currentPersonne).subscribe(resp => {
      this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe( resp => {
        this.currentPersonne = resp;
        this.resetForm();
      })
    })

  }

  changePassword() {
    if(this.oldPassword != this.currentPersonne.utilisateur.password){
      this.resetForm();
      this.wrongPassword = true;
    } else {
      if (this.newPassword != this.confirmedNewPassword) {
        this.resetForm();
        this.unmatchPassword = true;
      } else {
        this.currentPersonne.utilisateur.password = this.newPassword;
        this.http.put(this.appConfigService.backEnd + 'utilisateur/' + this.idUtilisateur, this.currentPersonne.utilisateur).subscribe(resp => {
          this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
            this.currentPersonne = resp;
            this.resetForm();
            this.succeedNewPassword = true;
          });
        })
      }
    }
  }

  resetForm() {
    this.newMail = "";
    this.newIdentifiant = "";
    this.newTelephone = "";
    this.wrongPassword= false;
    this.unmatchPassword= false;
    this.succeedNewPassword = false;
    this.newPassword = "";
    this.oldPassword = "";
    this.confirmedNewPassword = "";
  }

  // Liste de tous les Skeelz (tableau de skeelz dont l'index est similaire a un tableau de nombre (somme des pondération des compétences associé au skeelz)

  listSkeelz() {
    console.log("listSkeelz")
    this.tableauDeBordHttpService.findCompetenceSkeelzByIdPersonne(this.currentPersonne.id).subscribe(resp => {
      this.competenceSkeelz = resp;
      console.log(this.competenceSkeelz);

      this.mesSkeelzUniques = new Array<Skeelz>();

      for (let compske of this.competenceSkeelz) { // je recupere mes compskeelz
        if ( this.mesSkeelzUniques == undefined || !this.mesSkeelzUniques.find(item => item.id == compske.skeelz.id)) {
          this.mesSkeelzUniques.push(compske.skeelz);
        }
      }

      this.listeScoreSkeelz = new Array<number>();
      for(let i: number=0; i < this.mesSkeelzUniques.length; i++) {
        this.listeScoreSkeelz.push(0);

      }
      console.log((this.listeScoreSkeelz));
      console.log(this.competenceSkeelz);
      for (let compske of this.competenceSkeelz) {
        let index: number;
        let points: number = 0;
        index = this.mesSkeelzUniques.findIndex(item => item.id == compske.skeelz.id);
        console.log(index);
        // @ts-ignore
        if (compske.competence.ponderation == "CINQ") {
          points =  5;
        }
        // @ts-ignore
        else if (compske.competence.ponderation == "DIX") {
          points = 10;
          // @ts-ignore
        } else if (compske.competence.ponderation == "QUINZE") {
          points = 15;
          // @ts-ignore
        } else if (compske.competence.ponderation == "VINGT") {
          points = 20;
        }
        console.log(this.mesSkeelzUniques)
        console.log( this.listeScoreSkeelz)
        this.listeScoreSkeelz[index] += points;
      }
    });
  }

}
