import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {ActivatedRoute} from '@angular/router';
import {SommaireHttpService} from '../sommaire/sommaire-http-service';
import {EditionQcmHttpService} from './edition-qcm.http.service';
import {FormGroup} from '@angular/forms';
import {Question} from '../model/question';
import {Reponse} from '../model/reponse';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

@Component({
  selector: 'app-edition-cours',
  templateUrl: './edition-qcm.component.html',
  styleUrls: ['./edition-qcm.component.css']
})
export class EditionQcmComponent implements OnInit {

  idCours: number;
  idModule:number;
  cours: Cours = new Cours();
  currentQuestion: Question = new Question();
  currentModule: Module = new Module();
  currentReponse: Reponse = new Reponse();
  questions : Array<Question> = new Array<Question>();


  constructor(private route: ActivatedRoute, private editionCoursHttpService: EditionQcmHttpService, private http: HttpClient, private appConfigService: AppConfigService) {
    this.route.params.subscribe(params => {
      this.idCours = params['idCours'];
      this.idModule = params['idModule']
      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
      this.editionCoursHttpService.findByIdModule(this.idModule).subscribe(resp => this.currentModule = resp);
      this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
    });
  }

  questionCourant($event, questionId) {
    this.currentQuestion = this.questions.filter(question => question.id == questionId)[0];
    this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
    this.currentReponse = new Reponse();
  }

  deleteReponse(reponse:Reponse) {
    if (reponse.id) {
      this.http.delete(this.appConfigService.backEnd + 'reponse/' + reponse.id).subscribe((OK) => {
        this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
        this.editionCoursHttpService.findByIdModule(this.idModule).subscribe(resp => this.currentModule = resp);
        this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
                this.currentReponse = new Reponse();
                this.currentQuestion= new Question()
              });
            }



     else {
      this.currentReponse = new Reponse();
      this.currentQuestion= new Question()
    }
  }

  nouvelleQuestion() {
    console.log(this.questions)
    this.currentQuestion= new Question();
    this.currentQuestion.question=" ";
    this.questions.push(this.currentQuestion);

  }

  saveQcm(module : Module, question : Question, reponses : Array<Reponse>) {
    module.cours = this.cours;
    this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe( resp =>{
      if (question.id){
        question.module = <Module> resp
        this.http.put(this.appConfigService.backEnd + 'question/' + question.id, question).subscribe( resp =>{
          for (let reponse of reponses){
            if (reponse.id){
              reponse.question = <Question> resp;
              this.http.put(this.appConfigService.backEnd + 'reponse/' + reponse.id, reponse).subscribe(resp =>
              {
                this.route.params.subscribe(params => {
                  this.idCours = params['idCours'];
                  this.idModule = params['idModule']
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findByIdModule(this.idModule).subscribe(resp => this.currentModule = resp);
                  this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
                });
              })
            }
            else{
              reponse.question = <Question> resp;

              this.http.post(this.appConfigService.backEnd + 'reponse', reponse).subscribe(resp =>
              {
                this.route.params.subscribe(params => {
                  this.idCours = params['idCours'];
                  this.idModule = params['idModule']
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findByIdModule(this.idModule).subscribe(resp => this.currentModule = resp);
                  this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
                });
              })

            }}})}
      else {
        question.module = <Module> resp;
        this.http.post(this.appConfigService.backEnd + 'question', question).subscribe( resp =>{
          for (let reponse of reponses){
            if (reponse.id){
              reponse.question = <Question> resp;
              this.http.put(this.appConfigService.backEnd + 'reponse/' + reponse.id, reponse).subscribe(resp =>
              {
                this.route.params.subscribe(params => {
                  this.idCours = params['idCours'];
                  this.idModule = params['idModule']
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findByIdModule(this.idModule).subscribe(resp => this.currentModule = resp);
                  this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
                });
              })
            }
            else{
              console.log(reponse)
              reponse.question = <Question> resp;
              this.http.post(this.appConfigService.backEnd + 'reponse', reponse).subscribe(resp =>
              {
                this.route.params.subscribe(params => {
                  this.idCours = params['idCours'];
                  this.idModule = params['idModule']
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findByIdModule(this.idModule).subscribe(resp => this.currentModule = resp);
                  this.editionCoursHttpService.findQuestionReponses(this.idModule).subscribe(resp => this.questions = resp);
                });
              })

            }}})
      }}
    )
    console.log(this.currentQuestion);
    this.currentQuestion=new Question();

  }



  enregistrerReponse() {
    if (!this.currentQuestion.reponses) {
      this.currentQuestion.reponses = new Array<Reponse>();
    }
    this.currentQuestion.reponses.push(this.currentReponse);
    this.currentReponse = new Reponse();
  }


  ngOnInit() {

  }


}
