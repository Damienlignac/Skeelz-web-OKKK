import {Question} from './question';

export class Module {
  id: number;
  version: number;
  intitule: string;
  agencement: number;
  nbQuestion: number;
  periodicite: number;
  nbTentativeAutorise: number;
  enonceQCM: string;
  cours: Cours;
  qcmPersonnes: Array<QCMPersonne>;
  questions: Array<Question>;
  chapitres: Array<Chapitre>;


  constructor(id?: number, version?: number, intitule?: string, agencement?: number, nbQuestion?: number, periodicite?: number, nbTentativeAutorise?: number, enonceQCM?: string, cours?: Cours, qcmPersonnes?: Array<QCMPersonne>, questions?: Array<Question>, chapitres?: Array<Chapitre>) {
    this.id = id;
    this.version = version;
    this.intitule = intitule;
    this.agencement = agencement;
    this.nbQuestion = nbQuestion;
    this.periodicite = periodicite;
    this.nbTentativeAutorise = nbTentativeAutorise;
    this.enonceQCM = enonceQCM;
    this.cours = cours;
    this.qcmPersonnes = qcmPersonnes;
    this.questions = questions;
    this.chapitres = chapitres;
  }
}
