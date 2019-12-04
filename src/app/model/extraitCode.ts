import {ElementDeCours} from './elementDeCours';
import {Chapitre} from './chapitre';

export class ExtraitCode extends ElementDeCours{
  contenu: string;
  commentaire: string;


  constructor(id: number, version: number, agencement: number, chapitre: Chapitre, contenu: string, commentaire: string) {
    super(id, version, agencement, chapitre);
    this.contenu = contenu;
    this.commentaire = commentaire;
  }
}
