import {Skeelz} from './skeelz';
import {BilanCompetence} from './bilanCompetence';
import {Competence} from './competence';

export class CompetenceSkeelz {
  id: number;
  version: number;
  skeelz: Skeelz;
  competences: Array<Competence> = new Array<Competence>();
  bilanCompetence: BilanCompetence;


  constructor(id?: number, version?: number, skeelz?: Skeelz, competences?: Array<Competence>, bilanCompetence?: BilanCompetence) {
    this.id = id;
    this.version = version;
    this.skeelz = skeelz;
    this.competences = competences;
    this.bilanCompetence = bilanCompetence;
  }
}
