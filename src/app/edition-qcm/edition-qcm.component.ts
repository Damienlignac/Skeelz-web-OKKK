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
  aAjouter: string;
  currentElement: ElementDeCours = new ElementDeCours();


  constructor(private route: ActivatedRoute, private editionCoursHttpService: EditionQcmHttpService) {
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
    this.currentReponse = new Reponse();
  }

  // chapitreCourant($event, chapitreId) {
  //   this.currentChapitre = this.currentModule.chapitres.filter(chapitre => chapitre.id == chapitreId)[0];
  //   this.editionCoursHttpService.findByIdElement(this.currentChapitre.id).subscribe(resp => this.elementDeCours = resp);
  //   this.currentElement = new ElementDeCours();
  //
  // }


  nouvelleQuestion() {
    console.log(this.questions)
    this.currentReponse= new Reponse();
    this.questions.push(this.currentQuestion);

  }


  // nouveauElement() {
  //   this.currentElement= new ElementDeCours();
  //   let agencementMax: number = -1;
  //   if (this.elementDeCours) {
  //     for (let elem of this.elementDeCours) {
  //       if (elem.agencement > agencementMax) {
  //         agencementMax = elem.agencement;
  //       }
  //     }
  //   }
  //   this.currentElement.agencement = agencementMax + 1;
  //   if (this.aAjouter == 'texte') {
  //     this.currentElement.type = 'Paragraphe';
  //   }
  //   if (this.aAjouter == 'image') {
  //     this.currentElement.type = 'Image';
  //   }
  //   if (this.aAjouter == 'extraitCode') {
  //     this.currentElement.type = 'ExtraitCode';
  //   }
  // }


  save(cours:Cours, currentModule : Module, currentChapitre: Chapitre, elementDeCours: Array<ElementDeCours>) {
    this.editionCoursHttpService.saveCours(cours, currentModule, currentChapitre, elementDeCours);
    this.currentModule = new Module();
    this.currentChapitre = new Chapitre();
    this.elementDeCours = new Array<ElementDeCours>();
    console.log(this.currentModule);
  }

  // saveValidate(cours:Cours, currentModule : Module, currentChapitre: Chapitre, elementDeCours: Array<ElementDeCours>) {
  //   this.editionCoursHttpService.saveValidate(cours, currentModule, currentChapitre, elementDeCours);
  //   this.currentChapitre = new Chapitre();
  //   this.elementDeCours = new Array<ElementDeCours>();
  //   console.log(this.currentModule);
  // }

  // nouveauModule() {
  //   this.currentModule = new Module();
  //   let agencementMax: number = -1;
  //   if (this.moduleAndChap) {
  //     for (let mod of this.moduleAndChap) {
  //       if (mod.agencement > agencementMax) {
  //         agencementMax = mod.agencement;
  //       }
  //     }
  //   }
  //   this.currentModule.agencement = agencementMax + 1;
  //   this.moduleAndChap.push(this.currentModule);
  //   this.currentChapitre = new Chapitre();
  //   this.elementDeCours = null;
  //   this.currentElement = new ElementDeCours();
  // }
  //
  //
  // enregistrerEvent() {
  //   if (!this.elementDeCours) {
  //     this.elementDeCours = new Array<ElementDeCours>();
  //   }
  //   this.elementDeCours.push(this.currentElement);
  //   this.currentElement = new ElementDeCours();
  // }

  ngOnInit() {

  }


}
