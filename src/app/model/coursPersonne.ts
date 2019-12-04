import {Cours} from './cours';

export class CoursPersonne {
  id: number;
  version: number;
  etatCours:EtatCours;
  personne:Personne;
  cours:Cours


  constructor(id: number, version: number, etatCours: EtatCours, personne: Personne, cours: Cours) {
    this.id = id;
    this.version = version;
    this.etatCours = etatCours;
    this.personne = personne;
    this.cours = cours;
  }
}


