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
  competences: Array<Competence>;
  courss: Array<Cours>;
  utilisateurs: Array<Utilisateur>;


  constructor(id?: number, version?: number, nom?: string, numeroSiret?: string, typeContrat?: string, skeelzs?: Array<Skeelz>, competences?: Array<Competence>, courss?: Array<Cours>, utilisateurs?: Array<Utilisateur>) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.numeroSiret = numeroSiret;
    this.typeContrat = typeContrat;
    this.skeelz = skeelz;
    this.competences = competences;
    this.courss = courss;
    this.utilisateurs = utilisateurs;
  }
}
