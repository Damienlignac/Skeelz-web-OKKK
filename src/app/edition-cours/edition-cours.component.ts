import { Component, OnInit } from '@angular/core';
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

  idCours : number;
  cours : Cours;
  moduleAndChap: Array<Module>;
  currentModule:Module = new Module();
  currentChapitre = new Chapitre();
  elementDeCours:any



  constructor(private route: ActivatedRoute, private editionCoursHttpService: EditionCoursHttpService) {
    this.route.params.subscribe(params => {this.idCours = params['id']; })
  }

  moduleCourant($event, moduleId){
    console.log(moduleId);
    this.currentModule= this.moduleAndChap.filter(module => module.id == moduleId)[0];
    console.log(this.currentModule.intitule)
    this.currentChapitre = new Chapitre()

  }

  chapitreCourant($event, chapitreId){
    console.log(chapitreId);
    this.currentChapitre= this.currentModule.chapitres.filter(chapitre => chapitre.id == chapitreId)[0];
    console.log(this.currentChapitre.titre)
    this.editionCoursHttpService.findByIdElement(this.currentChapitre.id).subscribe(resp => this.elementDeCours = resp);


  }
  saveModule(){
    this.editionCoursHttpService.saveModule(this.currentModule)
  }

  nouveauModule(){
     this.currentModule=new Module();
     let agencementMax : number =0;
     if (this.moduleAndChap) {
       for (let mod of this.moduleAndChap) {
         if (mod.agencement > agencementMax) {
           agencementMax = mod.agencement;
         }
       }
     }
    this.currentModule.agencement=agencementMax+1;
    this.moduleAndChap.push(this.currentModule);
    console.log(this.currentModule.agencement)
  }

  nouveauChapitre(){
    this.currentChapitre=new Chapitre();
    let agencementMax : number =0;
    if (this.currentModule.chapitres) {
      for (let chap of this.currentModule.chapitres) {
        if (chap.agencement > agencementMax) {
          agencementMax = chap.agencement;
        }
      }
      this.currentChapitre.agencement=agencementMax+1;
      this.currentModule.chapitres.push(this.currentChapitre);
    }
    else {
      this.currentChapitre.agencement = agencementMax + 1;
      this.currentModule.chapitres = new Array<Chapitre>();
      this.currentModule.chapitres.push(this.currentChapitre);
    }
  }

  ngOnInit() {
    this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
    this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
  }

}
