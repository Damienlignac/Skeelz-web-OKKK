import {Etat} from './etat';
import {Difficulte} from './difficulte';

export class Cours {

  id: number;
  version: number;
  intitule: string;
  description: string;
  cheminImageCours: string;
  duree: number;

  difficulte: Difficulte;
  etat: Etat;
  coursCompetence: Array<CoursCompetence> = new Array<CoursCompetence>();
  module: Array<Module> = new Array<Module>();
  CoursPersonne: Array<CoursPersonne> = new Array<CoursPersonne>();


  constructor(id: number, version: number, intitule: string, description: string, cheminImageCours: string, duree: number, difficulte: Difficulte, etat: Etat, coursCompetence: Array<CoursCompetence>, module: Array<Module>, CoursPersonne: Array<CoursPersonne>) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.description = description;
    this.cheminImageCours = cheminImageCours;
    this.duree = duree;
    this.difficulte = difficulte;
    this.etat = etat;
    this.coursCompetence = coursCompetence;
    this.module = module;
    this.CoursPersonne = CoursPersonne;
  }
}
