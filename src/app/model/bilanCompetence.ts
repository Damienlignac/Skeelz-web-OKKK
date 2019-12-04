import {CompetenceSkeelz} from './competenceSkeelz';

export class BilanCompetence {
  id: number;
  version: number;
  competenceSkeelz: CompetenceSkeelz;
  personne: Personne;


  constructor(id?: number, version?: number, competenceSkeelz?: CompetenceSkeelz, personne?: Personne) {
    this.id = id;
    this.version = version;
    this.competenceSkeelz = competenceSkeelz;
    this.personne = personne;
  }
}
