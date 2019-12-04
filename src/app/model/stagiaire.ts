import {Personne} from './personne';
import {Adresse} from './adresse';

export class Stagiaire extends Personne {
  dtNaissance: Date;
  niveauEtude: string;

  constructor(id?: number, version?: number, nom?: string, prenom?: string, email?: string, telephone?: string, adresse?: Adresse, dtNaissance?: Date, niveauEtude?: string) {
    super(id, version, nom, prenom, email, telephone, adresse);
    this.dtNaissance = dtNaissance;
    this.niveauEtude = niveauEtude;
  }
}


