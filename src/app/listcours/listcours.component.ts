import { Component, OnInit } from '@angular/core';
import {ListcoursHttpService} from './listcours.http.service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';
import {filter} from 'rxjs/operators';
import {Skeelz} from '../model/skeelz';

@Component({
  selector: 'listcours',
  templateUrl: './listcours.component.html',
  styleUrls: ['./listcours.component.css']
})
export class ListcoursComponent implements OnInit {
  cours: Cours = null;
  difficulte: Difficulte = null;
  valeur = '';
  courss: Array<Cours> = new Array<Cours>();
  skeelzs: Array<Skeelz> = new Array<Skeelz>();
  skeelzid: number = null;
  diffe: Difficulte = null;
  loop = true;
  coursss: Array<Cours> = new Array<Cours>();
  constructor(private listcoursservice: ListcoursHttpService) {

  }

  ngOnInit() {

  }

  list() {

    if (this.loop === true) {
      return this.listcoursservice.findAll().filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
    }
  }


  chargeskeelz(): any {
    this.skeelzs = this.listcoursservice.findAllSkeelz();
    return this.skeelzs;
  }
  recherchez() {
    console.log(this.skeelzid);
    console.log(this.difficulte);
    this.loop = false;

    // @ts-ignore
    if (this.difficulte == 'null' && this.skeelzid == null) {
      console.log('diffi null skeelznull');
      this.loop = true;
      console.log(this.loop);
      return this.list();
    } else if (this.difficulte != null && this.skeelzid == null) {
      console.log('diffi !=null skeelz==null');
      this.listcoursservice.findByDifficulte(this.difficulte).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
      });
      console.log(this.loop);
      return this.coursss;
    } else if (this.skeelzid != null && (this.difficulte == 'null' || this.difficulte == null)) {
            console.log('diffi==null skeelz!=null');
            console.log(this.skeelzid);
            this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
              this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
            });
            return this.coursss;
          } else if (this.skeelzid != null &&  this.difficulte != null) {
            console.log('diffi!=null skeelz!=null');
            console.log(this.skeelzid);
            return  this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
              // tslint:disable-next-line:no-shadowed-variable
              this.listcoursservice.findByDifficulte(this.difficulte).subscribe(resp => {
                this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1); });
            });

          }
    }












  OrdreCroissant() {

  }
  OrdredeCroissant() {

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
