import {Etat} from './etat';
import {Difficulte} from './difficulte';
import {CoursCompetence} from './coursCompetence';
import {Module} from './module';
import {CoursPersonne} from './coursPersonne';

export class Cours {

  id: number;
  version: number;
  intitule: string;
  description: string;
  cheminImageCours: string;
  duree: number;

  difficulte: Difficulte;
  etat: Etat;
  coursCompetences: Array<CoursCompetence> = new Array<CoursCompetence>();
  modules: Array<Module> = new Array<Module>();
  coursPersonnes: Array<CoursPersonne> = new Array<CoursPersonne>();


  constructor(id?: number, version?: number, intitule?: string, description?: string, cheminImageCours?: string, duree?: number, difficulte?: Difficulte, etat?: Etat, coursCompetences?: Array<CoursCompetence>, modules?: Array<Module>, coursPersonnes?: Array<CoursPersonne>) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.description = description;
    this.cheminImageCours = cheminImageCours;
    this.duree = duree;
    this.difficulte = difficulte;
    this.etat = etat;
    this.coursCompetences = coursCompetences;
    this.modules = modules;
    this.coursPersonnes = coursPersonnes;
  }
}
