import {Module} from './module';
import {Reponse} from './reponse';

export class Question {
  id: number;
  version: number;
  question: string;
  module: Module;
  reponses: Array<Reponse>;
  nbReponsesJustes: number;


  constructor(id?: number, version?: number, question?: string, module?: Module, reponses?: Array<Reponse>, nbReponsesJustes?: number) {
    this.id = id;
    this.version = version;
    this.question = question;
    this.module = module;
    this.reponses = reponses;
    this.nbReponsesJustes = nbReponsesJustes;
  }
}
