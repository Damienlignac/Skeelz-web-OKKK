import {Component, OnInit} from '@angular/core';
import {ListcoursHttpService} from './listcours.http.service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';
import {Skeelz} from '../model/skeelz';
import {Etat} from '../model/etat';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Module} from '../model/module';

@Component({
  selector: 'listcours',
  templateUrl: './listcours.component.html',
  styleUrls: ['./listcours.component.css']
})
export class ListcoursComponent implements OnInit {

  id: string;

  cours: Cours = null;
  difficultee: Difficulte = null;
  valeur = '';
  skeelzs: Array<Skeelz> = new Array<Skeelz>();
  skeelzid: number = null;
  loop = true;
  coursss: Array<Cours> = new Array<Cours>();
  ordreDuree:string='null';
  module0:any;
  idModule0:number;
  coursId:number;
  cheminIntroCours:string;



  constructor(private listcoursservice: ListcoursHttpService, private router: Router,public authService: AuthService) {

  }

  ngOnInit() {
    this.id = localStorage.getItem('token');
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
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
    console.log(this.difficultee);
    console.log(this.skeelzid);
    console.log(this.ordreDuree);
    this.loop = false;

    // @ts-ignore
    if (this.difficultee == null && this.skeelzid == null && this.ordreDuree =="null" ) {
      console.log('diffi ==null skeelz==null ordre==null');
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.coursss= this.listcoursservice.findAll().filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
      return this.coursss;
    }
    // @ts-ignore
    else if (this.difficultee == null && this.skeelzid == null && this.ordreDuree =="decroissant") {
      console.log('diffi ==null skeelz==null ordre==decroissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.coursss= this.listcoursservice.findAll().filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
      return this.coursss.sort((a,b) => (a.duree < b.duree) ? 1 : ((b.duree < a.duree) ? -1 : 0));
    }
    // @ts-ignore
    else if ( this.difficultee == null && this.skeelzid == null && this.ordreDuree =='croissant') {
      console.log('diffi !=null skeelz==null ordre==croissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.coursss= this.listcoursservice.findAll().filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
      return this.coursss.sort((a,b) => (a.duree > b.duree) ? 1 : ((b.duree > a.duree) ? -1 : 0));
    }
// @ts-ignore
    else if ( this.difficultee != null && this.skeelzid == null && this.ordreDuree == "null") {
      console.log('diffi !=null skeelz==null ordre==null');
      console.log(this.difficultee);

      this.listcoursservice.findByDifficulte(this.difficultee).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree < b.duree) ? 1 : ((b.duree < a.duree) ? -1 : 0));
      });


    }
// @ts-ignore
    else if ( this.difficultee != null && this.skeelzid == null && this.ordreDuree == "croissant") {
  console.log('diffi !=null skeelz==null ordre==croissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
  this.listcoursservice.findByDifficulte(this.difficultee).subscribe(resp => {
  this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree > b.duree) ? 1 : ((b.duree > a.duree) ? -1 : 0));
    console.log(this.coursss);
});


}
// @ts-ignore
    else if (this.difficultee != null && this.skeelzid == null && this.ordreDuree =="decroissant") {
  console.log('diffi !=null skeelz==null  ordre==croissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
  this.listcoursservice.findByDifficulte(this.difficultee ).subscribe(resp => {
    this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree < b.duree) ? 1 : ((b.duree < a.duree) ? -1 : 0));
  });

}
    // @ts-ignore
    else if (this.skeelzid != null &&  this.difficultee == null && this.ordreDuree =="null") {
            console.log('diffi==null skeelz!=null ordre==null');
      console.log(this.difficultee);
      console.log(this.skeelzid);
            this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
              this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
            });
            return this.coursss;
          }
    // @ts-ignore
    else if (this.skeelzid != null &&  this.difficultee == null&& this.ordreDuree =="croissant") {
      console.log('diffi==null skeelz!=null  ordre==croissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree > b.duree) ? 1 : ((b.duree > a.duree) ? -1 : 0));
      });
    }
    // @ts-ignore
    else if (this.skeelzid != null &&  this.difficultee == null&& this.ordreDuree =="decroissant") {
      console.log('diffi==null skeelz!=null  ordre==decroissant' );
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree < b.duree) ? 1 : ((b.duree < a.duree) ? -1 : 0));
      });

    }
// @ts-ignore
    else if (this.skeelzid != null &&  this.difficultee != null && this.ordreDuree =="null" ) {
      console.log('diffi!=null skeelz!=null  ordre==null');
      console.log(this.difficultee);
      console.log(this.skeelzid);
       this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.difficulte.indexOf(this.difficultee) !==-1).filter(cour => cour.intitule.indexOf(this.valeur) !== -1);
      });
      }
    // @ts-ignore
    else if (this.skeelzid != null && this.difficultee != null && this.ordreDuree =="croissant" ) {
      console.log('diffi!=null skeelz!=null  ordre==croissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.difficulte.indexOf(this.difficultee) !==-1).filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree > b.duree) ? 1 : ((b.duree > a.duree) ? -1 : 0));;
      });

    }
    // @ts-ignore
    else if (this.skeelzid != null && this.difficultee != null && this.ordreDuree =="decroissant" ) {
      console.log('diffi!=null skeelz!=null  ordre==decroissant');
      console.log(this.difficultee);
      console.log(this.skeelzid);
      this.listcoursservice.findBySkeelz(this.skeelzid).subscribe(resp => {
        this.coursss = resp.filter(cour => cour.difficulte.indexOf(this.difficultee) !==-1).filter(cour => cour.intitule.indexOf(this.valeur) !== -1).sort((a,b) => (a.duree < b.duree) ? 1 : ((b.duree < a.duree) ? -1 : 0));;
      });
    }

    }


    introCours(idCours:number) {
      console.log(idCours)

      this.listcoursservice.findIntroCours(idCours, 0).subscribe(resp => {
        this.module0 = resp;
        this.router.navigate(['chapitre/' + [idCours] + '/' + this.module0.id + '/0']);
      });
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
