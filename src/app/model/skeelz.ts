import {Entreprise} from './entreprise';

export class Skeelz {
  id: number;
  version: number;
  intitule: string;
  competenceSkeelz: Array<CompetenceSkeelz>;
  entreprise: Entreprise;


  constructor(id?: number, version?: number, intitule?: string, competenceSkeelz?: Array<CompetenceSkeelz>, entreprise?: Entreprise) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.competenceSkeelz = competenceSkeelz;
    this.entreprise = entreprise;
  }
}
