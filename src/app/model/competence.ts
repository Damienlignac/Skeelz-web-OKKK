import {CompetenceSkeelz} from './competenceSkeelz';
import {BilanCompetence} from './bilanCompetence';
import {Ponderation} from './ponderation';

export class Competence {

  id: number;
  version: number;
  intitule: string;
  ponderation: Ponderation;
  description: string;
  competenceSkeelz: Array<CompetenceSkeelz> = new Array<CompetenceSkeelz>();
  bilanCompetences: Array<BilanCompetence> = new Array<BilanCompetence>();


  constructor(id: number, version: number, intitule: string, ponderation: Ponderation, description: string, competenceSkeelz: Array<CompetenceSkeelz>, bilanCompetences: Array<BilanCompetence>) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.ponderation = ponderation;
    this.description = description;
    this.competenceSkeelz = competenceSkeelz;
    this.bilanCompetences = bilanCompetences;
  }
}
