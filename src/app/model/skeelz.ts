import {Entreprise} from './entreprise';
import {CompetenceSkeelz} from './competenceSkeelz';

export class Skeelz {
  id: number;
  version: number;
  intitule: string;
  competenceSkeelz: Array<CompetenceSkeelz> = new Array<CompetenceSkeelz>();
  entreprise: Entreprise;
  choisi: boolean;


  constructor(id?: number, version?: number, intitule?: string, competenceSkeelz?: Array<CompetenceSkeelz>, entreprise?: Entreprise, choisi?: boolean) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.competenceSkeelz = competenceSkeelz;
    this.entreprise = entreprise;
    this.choisi = choisi;
  }
}
