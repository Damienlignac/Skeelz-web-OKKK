import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QcmHttpService} from './qcm-http.service';
import {SommaireHttpService} from '../sommaire/sommaire-http-service';
import {Module} from '../model/module';
import {Question} from '../model/question';
import {Chapitre} from '../model/chapitre';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})
export class QcmComponent implements OnInit {

  idCours: number;
  idModule: number;
  mesModules: Array<Module>;
  currentModule: Module;
  previousChapitre: Chapitre;
  nextModule: Module;
  questionsWithReponses: Array<Question>;
  currentQuestions: Array<Question>;
  totalReponsesJustes: number;
  nbReponsesJustes: number;
  nbReponsesFausses: number;
  tentative: boolean = false;

  constructor(private route: ActivatedRoute, private qcmHttpService: QcmHttpService, private sommaireHttpService: SommaireHttpService, private router: Router) {

    console.log("J'entre dans le contructeur");

    this.route.params.subscribe(params => {
      this.idCours = params['idCours'];
      this.idModule = params['idModule'];
      this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
        this.mesModules = resp;
        let filtreCurrentModule = this.mesModules.filter(item => item.id == this.idModule);
        this.currentModule = filtreCurrentModule[0];
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

    this.tentative = true;
  }

  ngOnInit() {  }

}
