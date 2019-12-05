import { Component, OnInit } from '@angular/core';
import {ListcoursHttpService} from './listcours.http.service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'listcours',
  templateUrl: './listcours.component.html',
  styleUrls: ['./listcours.component.css']
})
export class ListcoursComponent implements OnInit {
  cours: Cours = null;
  difficulte : Difficulte = null;
  valeur:string = "";
  courss:Array<Cours> = new Array<Cours>();
  constructor(private listcoursservice: ListcoursHttpService) {
  }
  ngOnInit() {
  }
  list() {
    if (this.difficulte==null){
    return  this.listcoursservice.findAll().filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
  }
    else{
      this.listcoursservice.findByDifficulte(this.difficulte).subscribe(resp=> {
        this.courss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
      });
      return this.courss

    }
  }
  list2():any{
    return this.listcoursservice.findAll2();
  }







  add() {
    this.cours = new Cours();
    // this.stagiaire.adresse = new Adresse();
  }

  edit(id: number) {
    this.listcoursservice.findById(id).subscribe(resp => this.cours = resp);
    // if(this.stagiaire.adresse == null){
    //   this.stagiaire.adresse = new Adresse();
    // }
  }

  delete(id: number) {
    this.listcoursservice.deleteBydId(id);
  }

  cancel() {
    this.cours = null;
  }

}
