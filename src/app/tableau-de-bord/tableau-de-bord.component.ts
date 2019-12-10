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

  private idUtilisateur: number;
  private currentPersonne: Personne;
  private coursSuivie: Array<Cours>=new Array<Cours>();

  private coursTermine: Array<Cours>=new Array<Cours>();

  private coursAdministre:Array<Cours>=new Array<Cours>();

  private module0: any;




  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.tableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;

      this.listCoursSuivie()
      this.listCoursTermine()
     this.listCoursCree()

    });

  }

  ngOnInit() {
  }

  listCoursSuivie() {

    return this.tableauDeBordHttpService.loadCoursSuivie(this.currentPersonne.id).subscribe(resp => this.coursSuivie = resp);

  }


  listCoursTermine() {

      return this.tableauDeBordHttpService.loadCoursTermine(this.currentPersonne.id).subscribe(resp => this.coursTermine = resp);;

  }

  listCoursCree() {

      return this.tableauDeBordHttpService.loadCoursCree(this.currentPersonne.id).subscribe(resp => this.coursAdministre = resp);;

  }

  // listSkeelz(){
  //   return this.tableauDeBordHttpService.loadPersonneSkeelz(this.currentPersonne.id);
  // }



  introCours(idCours: number) {
    this.tableauDeBordHttpService.findIntroCours(idCours, 0).subscribe(resp => {
      this.module0 = resp;
      this.router.navigate(['/chapitre/' + [idCours] + '/' + this.module0.id + '/0']);
    });
  }
  editionCours(idCours: number) {
    this.tableauDeBordHttpService.findIntroCours(idCours).subscribe(resp => {
      this.cours = resp;
      this.router.navigate(['/editionCours/' + [idCours]]);
    });
  }


}
