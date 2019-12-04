import {Module} from './module';
import {Reponse} from './reponse';

export class Question {
  id: number;
  version: number;
  question: string;
  module: Module;
  reponses: Array<Reponse>;


  constructor(id?: number, version?: number, question?: string, module?: Module, reponses?: Array<Reponse>) {
    this.id = id;
    this.version = version;
    this.question = question;
    this.module = module;
    this.reponses = reponses;
  }
}
