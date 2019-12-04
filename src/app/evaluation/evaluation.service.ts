import {Injectable} from '@angular/core';
import {Stagiaire} from '../model/stagiaire';
import {Adresse} from '../model/adresse';
import {Evaluation} from '../model/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  evaluations: Array<Evaluation> = new Array<Evaluation>();

  constructor() {
    this.evaluations.push(new Evaluation(1, 0, 15, 12, 'Commentaires Arnaud'));
    this.evaluations.push(new Evaluation(2, 0, 18, 15, 'Commentaires Théo'));
    this.evaluations.push(new Evaluation(3, 0, 13, 17, 'Commentaires Oriane'));
  }

  findAll(): Array<Evaluation> {
    return this.evaluations;
  }

  findById(id: number): Evaluation {
    for (let evaluation of this.evaluations) {
      if (id == evaluation.id) {
        return evaluation;
      }
    }

    return null;
  }

  save(evaluation: Evaluation) {
    let find: boolean = false;
    let index;
    for (index in this.evaluations) {
      if (evaluation.id == this.evaluations[index].id) {
        find = true;
        break;
      }
    }

    if (find) {
      this.evaluations[index] = evaluation;
    } else {
      this.evaluations.push(evaluation);
    }
  }

  deleteBydId(id: number) {
    let find: boolean = false;
    let index;
    for (index in this.evaluations) {
      if (id == this.evaluations[index].id) {
        find = true;
        break;
      }
    }

    if (find) {
      this.evaluations.splice(index, 1);
    }
  }
}
