import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Chapitre} from '../model/chapitre';
import {ChapitreHttpService} from './chapitre-http.service';
import {Module} from '../model/module';
import {SommaireHttpService} from '../sommaire/sommaire-http-service';
import {UtilisateurHttpService} from '../utilisateur/utilisateur-http.service';
import {Personne} from '../model/personne';
import {CoursPersonne} from '../model/coursPersonne';
import {EtatCours} from '../model/etatCours';
import {Cours} from '../model/cours';
import {ListcoursHttpService} from '../listcours/listcours.http.service';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

@Component({
  selector: 'chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {

  idUtilisateur: number;
  currentPersonne: Personne;
  idCours: number;
  currentCours: Cours;
  idModule: number;
  agencement: number;
  chapitre: Chapitre;
  listeChapitres: Array<Chapitre>;
  dernierChapitre: boolean;
  premierChapitre: boolean;
  mesModules: Array<Module>;
  currentCoursPersonne: Array<CoursPersonne>;
  currentModule: Module;
  previousModule: Module;
  dernierModule: boolean;
  premierModule: boolean;
  secondModule: Module;
  agencementMaxDernierChapitre: number;

  moduleAndChap: Array<Module>;


  constructor(private route: ActivatedRoute, private chapitreHttpService: ChapitreHttpService, private sommaireHttpService: SommaireHttpService,
              private utilisateurHttpService: UtilisateurHttpService, private listcoursHttpService: ListcoursHttpService, private http: HttpClient,
              private appConfigService: AppConfigService) {
    console.log("J'entre dans le constructeur de chapitre");
    this.route.params.subscribe(params => {
      this.idCours = params['idCours'];
      this.idModule = params['idModule'];
      this.agencement = params['agencementCh'];
      this.listcoursHttpService.findById(this.idCours).subscribe(resp => this.currentCours = resp);
      this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
        this.mesModules = resp;
        let filtreCurrentModule = this.mesModules.filter(item => item.id == this.idModule);
        this.currentModule = filtreCurrentModule[0];
        console.log(this.currentModule);
        if (this.currentModule.agencement == 0) {
          this.premierModule = true;
          let filtreSecondModule = this.mesModules.filter(item => item.agencement == 1);
          this.secondModule = filtreSecondModule[0];
          console.log("C est le premier module : " + this.premierModule)
        } else {
          this.premierModule = false;
          let filtrePreviousModule = this.mesModules.filter(item => item.agencement == (this.currentModule.agencement - 1));
          this.previousModule = filtrePreviousModule[0];
        }
        if ((this.currentModule.agencement + 1) == this.mesModules.length) {
          this.dernierModule = true;
        } else {
          this.dernierModule = false;
        }

      });
      this.chapitreHttpService.findByIdAndAgencement(this.idModule, this.agencement).subscribe(resp => {
          this.chapitre = resp;
          this.chapitreHttpService.findById(this.idModule).subscribe(resp => {
            this.listeChapitres = resp;
            if ((this.chapitre.agencement + 1) == this.listeChapitres.length) {
              this.dernierChapitre = true;
            } else {
              this.dernierChapitre = false;
            }
            ;
            if (this.chapitre.agencement == 0) {
              this.premierChapitre = true;
              if(!this.premierModule) {
                let max = 0;
                this.previousModule.chapitres.forEach(chap => {
                  if(chap.agencement > max) {
                    max = chap.agencement;
                  }
                })
                this.agencementMaxDernierChapitre = max;
              }
            } else {
              this.premierChapitre = false;
            }
            ;
          });
        }
      );

    });

// Sommaire
    this.route.params.subscribe(params => {this.idCours = params['idCours']; })
    this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
      this.moduleAndChap = resp.sort((a,b) => a.agencement - b.agencement);
    });
  }

  ngOnInit() {
    console.log("J'entre dans le Init de chapitre");
    this.idUtilisateur = +localStorage.getItem('token');
    this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      console.log(this.currentPersonne);
      this.chapitreHttpService.findCoursPersonneByIdPersonne(this.currentPersonne.id).subscribe(resp => {
        this.currentCoursPersonne = resp;
      })
    });
  }

  Commencer() {
    console.log("Version de la personne avant de lui associer le cours" );
    console.log(this.currentPersonne);
    console.log(this.currentPersonne.coursPersonne.length);
    if(this.currentPersonne.coursPersonne == undefined || !this.currentCoursPersonne.find(item => item.cours.id == this.idCours)){
      console.log("Le lien entre ce cours et cette personne n'existe pas")
      let coursPersonne = new CoursPersonne;
      coursPersonne.etatCours = EtatCours.SUIVI;
      coursPersonne.personne = this.currentPersonne;
      coursPersonne.cours = this.currentCours;

      console.log(coursPersonne);
      this.http.post(this.appConfigService.backEnd + 'CoursPersonne', coursPersonne).subscribe(resp => {
        console.log(resp);
        this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
          this.currentPersonne = resp;
          console.log("Version Update de la Personne avec le cours associé : ");
          console.log(this.currentPersonne);
        });
      });
    }
  }




}
