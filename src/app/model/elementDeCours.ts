import {Chapitre} from './chapitre';

export class ElementDeCours {
  id: number;
  version: number;
  type: string;
  agencement: number;
  chapitre: Chapitre;
  titre: string;
  texte: string;
  contenu: string;
  commentaire: string;
  chemin: string;


  constructor(id?: number, version?: number, type?: string, agencement?: number, chapitre?: Chapitre, titre?: string, texte?: string, contenu?: string, commentaire?: string, chemin?: string) {
    this.id = id;
    this.version = version;
    this.type = type;
    this.agencement = agencement;
    this.chapitre = chapitre;
    this.titre = titre;
    this.texte = texte;
    this.contenu = contenu;
    this.commentaire = commentaire;
    this.chemin = chemin;
  }
}
