export class Adresse {
  rue: string;
  complement: string;
  codePostal: string;
  ville: string;

  constructor(rue?: string, complement?: string, codePostal?: string, ville?: string) {
    this.rue = rue;
    this.complement = complement;
    this.codePostal = codePostal;
    this.ville = ville;
  }
}
