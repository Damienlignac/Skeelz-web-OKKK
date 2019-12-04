import {Chapitre} from './chapitre';

export abstract class ElementDeCours {
  id: number;
  version: number;
  agencement: number;
  chapitre: Chapitre;


  constructor(id: number, version: number, agencement: number, chapitre: Chapitre) {
    this.id = id;
    this.version = version;
    this.agencement = agencement;
    this.chapitre = chapitre;
  }
}
