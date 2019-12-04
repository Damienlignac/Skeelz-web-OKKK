export class Utilisateur {

  id: number;
  version: number;
mail:string;
password:string;
identifiant:string;
  administrateur:boolean;
  rh:boolean;
  superUser:boolean;

  entreprise:Array<Entreprise> = new Array<Entreprise>();
  personne:Array<Personne> = new Array<Personne>();


  constructor(id: number, version: number, mail: string, password: string, identifiant: string, administrateur: boolean, rh: boolean, superUser: boolean, entreprise: Array<Entreprise>, personne: Array<Personne>) {
    this.id = id;
    this.version = version;
    this.mail = mail;
    this.password = password;
    this.identifiant = identifiant;
    this.administrateur = administrateur;
    this.rh = rh;
    this.superUser = superUser;
    this.entreprise = entreprise;
    this.personne = personne;
  }
}

