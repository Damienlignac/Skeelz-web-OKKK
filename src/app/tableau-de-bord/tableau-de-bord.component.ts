import { Component, OnInit } from '@angular/core';
import {ListcoursHttpService} from '../listcours/listcours.http.service';
import {TableauDeBordHttpService} from './tableau-de-bord-http-service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';
import {Skeelz} from '../model/skeelz';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Personne} from '../model/personne';

@Component({
  selector: 'tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  cours: any;
  
  idUtilisateur: number;
  currentPersonne: Personne;
  coursss: any;
  module0: any;




  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.tableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      this.route.params.subscribe(params => {
        this.currentPersonne.id = params['idPersonne'];
      });
      this.listCoursSuivie();
      this.listCoursTermine();
      this.listCoursCree();
      // this.listSkeelz();
    });

  }

  ngOnInit() {
  }

  listCoursSuivie() {
  this.coursss =this.tableauDeBordHttpService.loadCoursSuivie(this.currentPersonne.id);
    return this.coursss

  }

  listCoursTermine() {
    this.coursss=  this.tableauDeBordHttpService.loadCoursTermine(this.currentPersonne.id);
    return this.coursss

  }

  listCoursCree() {
    this.coursss=this.tableauDeBordHttpService.loadCoursCree(this.currentPersonne.id);
    return this.coursss;

  }

  // listSkeelz(){
  //   return this.tableauDeBordHttpService.loadPersonneSkeelz(this.currentPersonne.id);
  // }



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
