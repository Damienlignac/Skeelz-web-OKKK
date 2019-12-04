import {RelationCours} from './relationCours';
import {Competence} from './competence';
import {Cours} from './cours';

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
