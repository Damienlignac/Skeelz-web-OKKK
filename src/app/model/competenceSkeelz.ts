import {Skeelz} from './skeelz';
import {BilanCompetence} from './bilanCompetence';

export class CompetenceSkeelz {
  id: number;
  version: number;
  skeelz: Skeelz;
  competence: Competence;
  bilanCompetence: BilanCompetence;


  constructor(id?: number, version?: number, skeelz?: Skeelz, competence?: Competence, bilanCompetence?: BilanCompetence) {
    this.id = id;
    this.version = version;
    this.skeelz = skeelz;
    this.competence = competence;
    this.bilanCompetence = bilanCompetence;
  }
}
