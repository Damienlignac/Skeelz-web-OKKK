import {BilanCompetence} from './bilanCompetence';
import {CoursPersonne} from './coursPersonne';
import {QCMPersonne} from './qcmPersonne';

class utilisateur {
}

export class Personne{
  id: number;
  version: number;
  nom: string;
  prenom: string;
  telephone:string;
  noteGlobale: number;
  bilanCompetence : Array<BilanCompetence>;
  coursPersonne: Array<CoursPersonne>;
  qcmPersonne: Array<QCMPersonne>;
  Utilisateur: utilisateur;


  constructor(id?: number, version?: number, nom?: string, prenom?: string, telephone?: string, noteGlobale?: number, bilanCompetence?: Array<BilanCompetence>, coursPersonne?: Array<CoursPersonne>, qcmPersonne?: Array<QCMPersonne>, Utilisateur?: utilisateur) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.noteGlobale = noteGlobale;
    this.bilanCompetence = bilanCompetence;
    this.coursPersonne = coursPersonne;
    this.qcmPersonne = qcmPersonne;
    this.Utilisateur = Utilisateur;
  }
}
