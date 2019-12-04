import {Skeelz} from './skeelz';
import {Competence} from './competence';
import {Utilisateur} from './utilisateur';
import {Cours} from './cours';

export class Entreprise {
  id: number;
  version: number;
  nom: string;
  numeroSiret: string;
  typeContrat: string;
  skeelz: Array<Skeelz>;
  competence: Array<Competence>;
  cours: Array<Cours>;
  utilisateur: Array<Utilisateur>;


  constructor(id?: number, version?: number, nom?: string, numeroSiret?: string, typeContrat?: string, skeelz?: Array<Skeelz>, competence?: Array<Competence>, cours?: Array<Cours>, utilisateur?: Array<Utilisateur>) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.numeroSiret = numeroSiret;
    this.typeContrat = typeContrat;
    this.skeelz = skeelz;
    this.competence = competence;
    this.cours = cours;
    this.utilisateur = utilisateur;
  }
}
