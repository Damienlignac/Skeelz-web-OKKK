import {Injectable} from '@angular/core';
import {Stagiaire} from '../model/stagiaire';
import {Adresse} from '../model/adresse';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  stagiaires: Array<Stagiaire> = new Array<Stagiaire>();

  constructor() {
 }

  findAll(): Array<Stagiaire> {
    return this.stagiaires;
  }

  findById(id: number): Stagiaire {
    for (let stagiaire of this.stagiaires) {
      if (id == stagiaire.id) {
        return stagiaire;
      }
    }

    return null;
  }

  save(stagiaire: Stagiaire) {
    let find: boolean = false;
    let index;
    for (index in this.stagiaires) {
      if (stagiaire.id == this.stagiaires[index].id) {
        find = true;
        break;
      }
    }

    if (find) {
      this.stagiaires[index] = stagiaire;
    } else {
      this.stagiaires.push(stagiaire);
    }
  }

  deleteBydId(id: number) {
    let find: boolean = false;
    let index;
    for (index in this.stagiaires) {
      if (id == this.stagiaires[index].id) {
        find = true;
        break;
      }
    }

    if (find) {
      this.stagiaires.splice(index, 1);
    }
  }
}
