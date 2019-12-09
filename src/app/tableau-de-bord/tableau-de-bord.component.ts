import { Component, OnInit } from '@angular/core';
import {ListcoursHttpService} from '../listcours/listcours.http.service';
import {TableauDeBordHttpService} from './tableau-de-bord-http-service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';
import {Skeelz} from '../model/skeelz';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  cours: any;
  difficultee: Difficulte = null;

  skeelzs: Array<Skeelz> = new Array<Skeelz>();


  coursss: Array<Cours> = new Array<Cours>();
  module0: any;




  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private router: Router, public authService: AuthService) {
  }

  ngOnInit() {
  }

  listCoursSuivie() {

    return this.tableauDeBordHttpService.findAllCoursSuivie();

  }

  listCoursTermine() {

    return this.tableauDeBordHttpService.findAllCoursTermine();

  }

  listCoursCree() {

    return this.tableauDeBordHttpService.findAllCoursCreer();

  }

  introCours(idCours: number) {


    this.tableauDeBordHttpService.findIntroCours(idCours, 0).subscribe(resp => {
      this.module0 = resp;
      this.router.navigate(['chapitre/' + [idCours] + '/' + this.module0.id + '/0']);
    });
  }

  editionCours(idCours: number) {


    // this.tableauDeBordHttpService.findIntroCours(idCours).subscribe(resp => {
    //   this.cours = resp;
      this.router.navigate(['editionCours/' + [idCours] ]);

  }


}
