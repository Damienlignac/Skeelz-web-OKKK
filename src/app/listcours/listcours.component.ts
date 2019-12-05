import { Component, OnInit } from '@angular/core';
import {ListcoursHttpService} from './listcours.http.service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';

@Component({
  selector: 'listcours',
  templateUrl: './listcours.component.html',
  styleUrls: ['./listcours.component.css']
})
export class ListcoursComponent implements OnInit {

  cours: Cours = null;
  difficulte = Difficulte.;

  constructor(private listcoursservice: ListcoursHttpService) {
  }

  ngOnInit() {
  }

  list():any {
    return this.listcoursservice.findAll();
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
