import {Entreprise} from './entreprise';
import {Personne} from './personne';

export class Utilisateur {

  id: number;
  version: number;
mail:string;
password:string;
identifiant:string;
  administrateur:boolean;
  rh:boolean;
  superUser:boolean;
  entreprise: Entreprise = new Entreprise();
  entreprises:Array<Entreprise> = new Array<Entreprise>();
  personnes:Array<Personne> = new Array<Personne>();


  constructor(id?: number, version?: number, mail?: string, password?: string, identifiant?: string, administrateur?: boolean, rh?: boolean, superUser?: boolean, entreprises?: Array<Entreprise>, personnes?: Array<Personne>, entreprise?: Entreprise) {
    this.id = id;
    this.version = version;
    this.mail = mail;
    this.password = password;
    this.identifiant = identifiant;
    this.administrateur = administrateur;
    this.rh = rh;
    this.superUser = superUser;
    this.entreprises = entreprises;
    this.personnes = personnes;
    this.entreprise = entreprise;
  }
}

