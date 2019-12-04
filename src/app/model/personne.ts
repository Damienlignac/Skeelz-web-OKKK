import {Adresse} from './adresse';

export abstract class Personne {
  id: number;
  version: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: Adresse;

  constructor(id?: number, version?: number, nom?: string, prenom?: string, email?: string, telephone?: string, adresse?: Adresse) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
  }
}
