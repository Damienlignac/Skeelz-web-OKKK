import {ElementDeCours} from './elementDeCours';
import {Chapitre} from './chapitre';

export class ImageCours extends ElementDeCours{
  chemin: string;
  commentaire: string;

  constructor(id: number, version: number, agencement: number, chapitre: Chapitre, chemin: string, commentaire: string) {
    super(id, version, agencement, chapitre);
    this.chemin = chemin;
    this.commentaire = commentaire;
  }
}
