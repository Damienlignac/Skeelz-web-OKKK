import {Entreprise} from './entreprise';
import {CompetenceSkeelz} from './competenceSkeelz';

export class Skeelz {
  id: number;
  version: number;
  intitule: string;
  competenceSkeelzs: Array<CompetenceSkeelz>;
  entreprise: Entreprise;


  constructor(id?: number, version?: number, intitule?: string, competenceSkeelzs?: Array<CompetenceSkeelz>, entreprise?: Entreprise) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.competenceSkeelzs = competenceSkeelzs;
    this.entreprise = entreprise;
  }
}
