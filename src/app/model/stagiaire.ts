import {Personne} from './personne';
import {Adresse} from './adresse';
import {niveauEtude} from './niveauEtude';

export class Stagiaire extends Personne {
  dtNaissance: Date;
  niveauEtude: niveauEtude;


  constructor(id?: number, version?: number, nom?: string, prenom?: string, email?: string, telephone?: string, adresse?: Adresse, dtNaissance?: Date, niveauEtude?: niveauEtude) {
    super(id, version, nom, prenom, email, telephone, adresse);
    this.dtNaissance = dtNaissance;
    this.niveauEtude = niveauEtude;

  }
}
