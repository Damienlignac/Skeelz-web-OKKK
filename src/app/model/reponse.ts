import {Question} from './question';

export class Reponse {
  id: number;
  version: number;
  enonce: string;
  juste: boolean;
  question: Question;
  choisi: boolean;


  constructor(id?: number, version?: number, enonce?: string, juste?: boolean, question?: Question, choisi?: boolean) {
    this.id = id;
    this.version = version;
    this.enonce = enonce;
    this.juste = juste;
    this.question = question;
    this.choisi = choisi;
  }
}
