import {Module} from './module';

export abstract class ElementDeCours {
  id: number;
  version: number;
  nbTentative: number;
  statutQCM: boolean;
  dateDerniereTentative: Date;
  personne: Personne;
  module: Module;


  constructor(id: number, version: number, nbTentative: number, statutQCM: boolean, dateDerniereTentative: Date, personne: Personne, module: Module) {
    this.id = id;
    this.version = version;
    this.nbTentative = nbTentative;
    this.statutQCM = statutQCM;
    this.dateDerniereTentative = dateDerniereTentative;
    this.personne = personne;
    this.module = module;
  }
}
