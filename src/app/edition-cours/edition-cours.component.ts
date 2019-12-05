import { Component, OnInit } from '@angular/core';
import {Cours} from '../model/cours';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';

@Component({
  selector: 'app-edition-cours',
  templateUrl: './edition-cours.component.html',
  styleUrls: ['./edition-cours.component.css']
})
export class EditionCoursComponent implements OnInit {

  cours : Cours;
  modules : Array<Module>;
  currentModule : Module;
  chapitres: Array<Chapitre>;
  currentChapitre : Chapitre;
  elementDeCours: Array<ElementDeCours>;

  constructor() { }

  ngOnInit() {
  }

}
