import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilisateurHttpService} from '../utilisateur/utilisateur-http.service';
import {Personne} from '../model/personne';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

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

  constructor(private route: ActivatedRoute, private utilisateurHttpService: UtilisateurHttpService, private http: HttpClient,
              private appConfigService: AppConfigService) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      console.log(this.currentPersonne);
      console.log(this.currentPersonne.utilisateur);
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

}
