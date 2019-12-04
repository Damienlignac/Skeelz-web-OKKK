export class Evaluation {
  id: number;
  version: number;
  comportementale: number;
  technique: number;
  commentaires: string;

  constructor(id?: number,version?: number,comportementale?: number, technique?: number, commentaires?: string) {
    this.id = id;
    this.version = version;
    this.comportementale = comportementale;
    this.technique = technique;
    this.commentaires = commentaires;
  }
}
