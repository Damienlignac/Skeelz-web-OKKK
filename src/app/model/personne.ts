import {BilanCompetence} from './bilanCompetence';
import {CoursPersonne} from './coursPersonne';
import {QCMPersonne} from './qcmPersonne';
import {Utilisateur} from './utilisateur';
import {Competence} from './competence';
import {Skeelz} from './skeelz';



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
  utilisateur: Utilisateur;
  competences: Array <Competence>;
  skeelzs: Array<Skeelz>;


  constructor(id?: number, version?: number, nom?: string, prenom?: string, telephone?: string, noteGlobale?: number, bilanCompetence?: Array<BilanCompetence>, coursPersonne?: Array<CoursPersonne>, qcmPersonne?: Array<QCMPersonne>, utilisateur?: Utilisateur, competences?: Array<Competence>, skeelzs?: Array<Skeelz>) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.noteGlobale = noteGlobale;
    this.bilanCompetence = bilanCompetence;
    this.coursPersonne = coursPersonne;
    this.qcmPersonne = qcmPersonne;
    this.utilisateur = utilisateur;
    this.competences = competences;
  }
}
