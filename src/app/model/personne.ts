import {BilanCompetence} from './bilanCompetence';
import {CoursPersonne} from './coursPersonne';
import {QCMPersonne} from './qcmPersonne';
import {Utilisateur} from './utilisateur';



export class Personne{
  id: number;
  version: number;
  nom: string;
  prenom: string;
  telephone:string;
  noteGlobale: number;
  bilanCompetences : Array<BilanCompetence>;
  coursPersonnes: Array<CoursPersonne>;
  qcmPersonnes: Array<QCMPersonne>;
  utilisateurs: Utilisateur;


  constructor(id?: number, version?: number, nom?: string, prenom?: string, telephone?: string, noteGlobale?: number, bilanCompetences?: Array<BilanCompetence>, coursPersonnes?: Array<CoursPersonne>, qcmPersonnes?: Array<QCMPersonne>, utilisateurs?: Utilisateur) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.noteGlobale = noteGlobale;
    this.bilanCompetences = bilanCompetences;
    this.coursPersonnes = coursPersonnes;
    this.qcmPersonnes = qcmPersonnes;
    this.utilisateurs = utilisateurs;
  }
}
