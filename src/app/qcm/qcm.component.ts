import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QcmHttpService} from './qcm-http.service';
import {SommaireHttpService} from '../sommaire/sommaire-http-service';
import {Module} from '../model/module';
import {Question} from '../model/question';
import {Chapitre} from '../model/chapitre';
import {UtilisateurHttpService} from '../utilisateur/utilisateur-http.service';
import {Personne} from '../model/personne';
import {Cours} from '../model/cours';
import {ListcoursHttpService} from '../listcours/listcours.http.service';
import {QCMPersonne} from '../model/qcmPersonne';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {CoursPersonne} from '../model/coursPersonne';
import {EtatCours} from '../model/etatCours';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})
export class QcmComponent implements OnInit {

  idUtilisateur: number;
  currentPersonne: Personne;

  currentQcmPersonne: QCMPersonne;
  listQcmPersonne: Array<QCMPersonne>;

  currentCoursPersonne: CoursPersonne;

  idCours: number;
  currentCours: Cours;
  idModule: number;
  mesModules: Array<Module>;
  currentModule: Module;
  previousChapitre: Chapitre;
  nextModule: Module;
  dernierModule: boolean;
  nbQcm: number;
  questionsWithReponses: Array<Question>;
  currentQuestions: Array<Question>;
  totalReponsesJustes: number;
  nbReponsesJustes: number;
  nbReponsesFausses: number;
  tentative: boolean = false;
  reussi: boolean;

  constructor(private route: ActivatedRoute, private qcmHttpService: QcmHttpService, private sommaireHttpService: SommaireHttpService, private router: Router,
              private utilisateurHttpService: UtilisateurHttpService, private listcoursHttpService: ListcoursHttpService, private http: HttpClient,
              private appConfigService: AppConfigService) {

    console.log("J'entre dans le contructeur");

    this.reussi = false;

    this.route.params.subscribe(params => {
      this.idCours = params['idCours'];
      this.idModule = params['idModule'];
      this.listcoursHttpService.findById(this.idCours).subscribe(resp => this.currentCours = resp);
      this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
        this.mesModules = resp;
        this.nbQcm = (this.mesModules.length - 1);
        let filtreCurrentModule = this.mesModules.filter(item => item.id == this.idModule);
        this.currentModule = filtreCurrentModule[0];

        if ((this.currentModule.agencement + 1) == this.mesModules.length) {
          this.dernierModule = true;
        } else {
          this.dernierModule = false;
        }

        let filtrePreviousChapitre = this.currentModule.chapitres.filter(item => item.agencement == (this.currentModule.chapitres.length - 1));
        this.previousChapitre = filtrePreviousChapitre[0];
        let filtreNextModule = this.mesModules.filter(item => item.agencement == (this.currentModule.agencement + 1));
        this.nextModule = filtreNextModule[0];
        this.qcmHttpService.findQuestionsWithReponsesById(this.idModule).subscribe(resp => {
          this.questionsWithReponses = resp;
          this.currentQuestions = this.questionsWithReponses;
          for(let i = (this.currentQuestions.length - 1); i > 0; i--){
            const j = Math.floor(Math.random() * i);
            const temp = this.currentQuestions[i]
            this.currentQuestions[i] = this.currentQuestions[j]
            this.currentQuestions[j] = temp
          }
          this.currentQuestions = this.currentQuestions.slice(0, this.currentModule.nbQuestion);
          this.totalReponsesJustes = 0;
          for(let question of this.currentQuestions){
            question.nbReponsesJustes = 0;
            for(let rep of question.reponses){
              rep.choisi = false;
              if(rep.juste){
                question.nbReponsesJustes ++;
                this.totalReponsesJustes ++;
              }
            }
          }
        })
      });

  })
  }

  valider() {
    console.log("J'entre dans valider()")
    this.nbReponsesJustes = 0;
    this.nbReponsesFausses = 0;

    for(let question of this.currentQuestions){
      for(let rep of question.reponses){
        if(rep.choisi){
          rep.choisi = false;
          if(rep.juste){
            this.nbReponsesJustes ++;
          } else {
            this.nbReponsesFausses ++;
          }
        }
      }
    }

    console.log("Nombre de réponses justes : " + this.nbReponsesJustes);
    console.log("Nombre de réponses justes attendues : " + this.totalReponsesJustes);
    console.log("Nombre de réponses fausses : " + this.nbReponsesFausses);

    if ((this.nbReponsesJustes == this.totalReponsesJustes) && this.nbReponsesFausses == 0){
      this.reussi = true;
    } else {
      this.reussi = false;
    }

    console.log("Voici le QcmPersonne courant avant modif :");
    console.log(this.currentQcmPersonne);

    console.log("Voici la personne courante :");
    console.log(this.currentPersonne);

    console.log("Voici les QCM de la personne courante :");
    console.log(this.currentPersonne.qcmPersonne);

    if (!this.listQcmPersonne.find(item => item.module.id == this.idModule)) {

      this.currentQcmPersonne = new QCMPersonne();
      this.currentQcmPersonne.statutQCM = this.reussi;
      this.currentQcmPersonne.nbTentative = 1;
      this.currentQcmPersonne.module = this.currentModule;
      this.currentQcmPersonne.personne = this.currentPersonne;

      this.http.post(this.appConfigService.backEnd + 'qcmPersonne', this.currentQcmPersonne).subscribe(resp => {
        this.qcmHttpService.findByIdPersonneAndIdModule(this.currentPersonne.id, this.currentModule.id).subscribe(resp => {
          this.currentQcmPersonne = resp;
          console.log("Voici le QcmPersonne renvoyer après la création :");
          console.log(this.currentQcmPersonne);
          this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
            this.currentPersonne = resp;
            this.qcmHttpService.findByIdPersonneAndIdCours(this.currentPersonne.id, this.idCours).subscribe(resp => {
              this.listQcmPersonne = resp;
              console.log(this.listQcmPersonne);
              console.log(this.currentPersonne);
              let nbQcmReussi: number = 0;
              for(let qcm of this.listQcmPersonne){
                if(qcm.statutQCM){
                  nbQcmReussi ++;
                  console.log(nbQcmReussi);
                }
              }
              if(nbQcmReussi == this.nbQcm) {

                console.log("Vous avez réussi tous les qcm");
                this.listcoursHttpService.findCoursPersonneByPersonneAndCours(this.currentPersonne.id, this.currentCours.id).subscribe(resp => {
                  this.currentCoursPersonne = resp;
                  this.validationBilanCompetence();
                })
              }
            });
          });
        });

      })
    } else {
      this.qcmHttpService.findByIdPersonneAndIdModule(this.currentPersonne.id, this.currentModule.id).subscribe(resp => {
        this.currentQcmPersonne = resp;
        console.log("Voici le QcmPersonne courant si il le trouve en base :");
        console.log(this.currentQcmPersonne);
        this.currentQcmPersonne.statutQCM = this.reussi;
        this.currentQcmPersonne.nbTentative ++;
        this.http.put(this.appConfigService.backEnd + 'qcmPersonne/' + this.currentQcmPersonne.id, this.currentQcmPersonne).subscribe(resp => {
          this.qcmHttpService.findByIdPersonneAndIdModule(this.currentPersonne.id, this.currentModule.id).subscribe(resp => {
            this.currentQcmPersonne = resp
            this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
              this.currentPersonne = resp;
              this.qcmHttpService.findByIdPersonneAndIdCours(this.currentPersonne.id, this.idCours).subscribe(resp => {
                this.listQcmPersonne = resp;
                let nbQcmReussis: number = 0;
                for(let qcm of this.listQcmPersonne){
                  if(qcm.statutQCM){
                    nbQcmReussis ++;
                    console.log(nbQcmReussis);
                  }
                }
                if(nbQcmReussis == this.nbQcm) {
                  console.log("Vous avez réussi tous les qcm");
                  this.listcoursHttpService.findCoursPersonneByPersonneAndCours(this.currentPersonne.id, this.currentCours.id).subscribe(resp => {
                    this.currentCoursPersonne = resp;
                    this.validationBilanCompetence();
                  })
                }
              });
            });
          });
      });
    });
    }

    this.tentative = true;
  }

  ngOnInit() {
    console.log("J'entre dans le Init du QCM");
    console.log(this.currentModule);
    this.idUtilisateur = +localStorage.getItem('token');
    this.utilisateurHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      this.listcoursHttpService.findCoursPersonneByPersonneAndCours(this.currentPersonne.id, this.currentCours.id).subscribe(resp => this.currentCoursPersonne = resp);
      console.log(this.currentPersonne);
      if(this.currentPersonne.qcmPersonne.length > 0){
        this.qcmHttpService.findByIdPersonneAndIdCours(this.currentPersonne.id, this.idCours).subscribe(resp => {
          this.listQcmPersonne = resp;
          let trouve = this.listQcmPersonne.find(item => item.module.id == this.currentModule.id && item.personne.id == this.currentPersonne.id);
          if(trouve) {
            this.currentQcmPersonne = trouve;
            if(trouve.statutQCM){
              this.reussi = true;
            } else {
              this.reussi = false;
            }
          }
        });
      } else {
        this.listQcmPersonne = new Array<QCMPersonne>();
      }
    });
  }

  validationBilanCompetence() {

  this.qcmHttpService.updateBilanCompetencePersonne(this.currentCoursPersonne.id).subscribe();

  }

}
