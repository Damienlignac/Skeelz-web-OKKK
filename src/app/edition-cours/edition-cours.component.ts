import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {ActivatedRoute} from '@angular/router';
import {SommaireHttpService} from '../sommaire/sommaire-http-service';
import {EditionCoursHttpService} from './edition-cours.http.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edition-cours',
  templateUrl: './edition-cours.component.html',
  styleUrls: ['./edition-cours.component.css']
})
export class EditionCoursComponent implements OnInit {

  idCours: number;
  cours: Cours = new Cours();
  moduleAndChap: Array<Module>;
  currentModule: Module = new Module();
  currentChapitre = new Chapitre();
  elementDeCours: Array<ElementDeCours>;
  aAjouter: string;
  currentElement: ElementDeCours = new ElementDeCours();


  constructor(private route: ActivatedRoute, private editionCoursHttpService: EditionCoursHttpService) {
    this.route.params.subscribe(params => {
      this.idCours = params['id'];
      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
    });
  }

  moduleCourant($event, moduleId) {
    this.currentModule = this.moduleAndChap.filter(module => module.id == moduleId)[0];
    this.currentChapitre = new Chapitre();
    this.currentElement = new ElementDeCours();
    this.elementDeCours = null;

  }

  chapitreCourant($event, chapitreId) {
    this.currentChapitre = this.currentModule.chapitres.filter(chapitre => chapitre.id == chapitreId)[0];
    this.editionCoursHttpService.findByIdElement(this.currentChapitre.id).subscribe(resp => this.elementDeCours = resp);
    this.currentElement = new ElementDeCours();

  }


  nouveauChapitre() {
    this.currentChapitre = new Chapitre();
    let agencementMax: number = -1;
    this.elementDeCours = null;
    this.currentElement = new ElementDeCours();
    if (this.currentModule.chapitres) {
      for (let chap of this.currentModule.chapitres) {
        if (chap.agencement > agencementMax) {
          agencementMax = chap.agencement;
        }
      }
      this.currentChapitre.agencement = agencementMax + 1;
      this.currentModule.chapitres.push(this.currentChapitre);
    } else {
      this.currentChapitre.agencement = agencementMax + 1;
      this.currentModule.chapitres = new Array<Chapitre>();
      this.currentModule.chapitres.push(this.currentChapitre);
    }
  }


  nouveauElement() {
    this.currentElement= new ElementDeCours();
    let agencementMax: number = -1;
    if (this.elementDeCours) {
      for (let elem of this.elementDeCours) {
        if (elem.agencement > agencementMax) {
          agencementMax = elem.agencement;
        }
      }
    }
    this.currentElement.agencement = agencementMax + 1;
    if (this.aAjouter == 'texte') {
      this.currentElement.type = 'Paragraphe';
    }
    if (this.aAjouter == 'image') {
      this.currentElement.type = 'Image';
    }
    if (this.aAjouter == 'extraitCode') {
      this.currentElement.type = 'ExtraitCode';
    }
  }


  save(cours:Cours, currentModule : Module, currentChapitre: Chapitre, elementDeCours: Array<ElementDeCours>) {
    this.editionCoursHttpService.saveCours(cours, currentModule, currentChapitre, elementDeCours);
    this.currentModule = new Module();
    this.currentChapitre = new Chapitre();
    this.elementDeCours = new Array<ElementDeCours>();
    console.log(this.currentModule);
  }

  saveValidate(cours:Cours, currentModule : Module, currentChapitre: Chapitre, elementDeCours: Array<ElementDeCours>) {
    this.editionCoursHttpService.saveValidate(cours, currentModule, currentChapitre, elementDeCours);
    this.currentChapitre = new Chapitre();
    this.elementDeCours = new Array<ElementDeCours>();
    console.log(this.currentModule);
  }

  nouveauModule() {
    this.currentModule = new Module();
    let agencementMax: number = -1;
    if (this.moduleAndChap) {
      for (let mod of this.moduleAndChap) {
        if (mod.agencement > agencementMax) {
          agencementMax = mod.agencement;
        }
      }
    }
    this.currentModule.agencement = agencementMax + 1;
    this.moduleAndChap.push(this.currentModule);
    this.currentChapitre = new Chapitre();
    this.elementDeCours = null;
    this.currentElement = new ElementDeCours();
  }


  enregistrerEvent() {
    if (!this.elementDeCours) {
      this.elementDeCours = new Array<ElementDeCours>();
    }
    this.elementDeCours.push(this.currentElement);
    this.currentElement = new ElementDeCours();
  }

  ngOnInit() {

  }


}
