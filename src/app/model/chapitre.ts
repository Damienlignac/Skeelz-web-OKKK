import {Module} from './module';
import {ElementDeCours} from './elementDeCours';

export class Chapitre {
  id: number;
  version: number;
  titre: string;
  agencement: number;
  module: Module;
  elementsDeCours: Array<ElementDeCours>;


  constructor(id?: number, version?: number, titre?: string, agencement?: number, module?: Module, elementsDeCours?: Array<ElementDeCours>) {
    this.id = id;
    this.version = version;
    this.titre = titre;
    this.agencement = agencement;
    this.module = module;
    this.elementsDeCours = elementsDeCours;
  }
}
