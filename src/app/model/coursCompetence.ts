import {RelationCours} from './relationCours';

export class CoursCompetence {
  id: number;
  version: number;
  relationCours : RelationCours;
  competence : Competence;
  cours: Cours;


  constructor(id?: number, version?: number, relationCours?: RelationCours, competence?: Competence, cours?: Cours) {
    this.id = id;
    this.version = version;
    this.relationCours = relationCours;
    this.competence = competence;
    this.cours = cours;
  }
}
