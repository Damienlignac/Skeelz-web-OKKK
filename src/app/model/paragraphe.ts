import {ElementDeCours} from './elementDeCours';
import {Chapitre} from './chapitre';

export class Paragraphe extends ElementDeCours{
  titre: string;
  texte: string;

  constructor(id: number, version: number, agencement: number, chapitre: Chapitre, titre: string, texte: string) {
    super(id, version, agencement, chapitre);
    this.titre = titre;
    this.texte = texte;
  }
}
