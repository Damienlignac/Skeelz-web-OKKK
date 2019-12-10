import { Component, OnInit } from '@angular/core';
import {ListcoursHttpService} from '../listcours/listcours.http.service';
import {TableauDeBordHttpService} from './tableau-de-bord-http-service';
import {Cours} from '../model/cours';
import {Difficulte} from '../model/difficulte';
import {Skeelz} from '../model/skeelz';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Personne} from '../model/personne';
import {Competence} from '../model/competence';
import {SectionTableauDeBordHttpService} from '../section-tableau-de-bord/section-tableau-de-bord-http-service';

@Component({
  selector: 'tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  cours: any;

  private idUtilisateur: number;
  private currentPersonne: Personne;
  private coursSuivie: Array<Cours> = new Array<Cours>();

  private coursTermine: Array<Cours> = new Array<Cours>();

  private coursAdministre: Array<Cours> = new Array<Cours>();

  private module0: any;

  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  tmp: number = 0;

  npteGlobal: number = 0;

  numberponde5: number = 5;
  numberponde10: number = 10;
  numberponde15: number = 15;
  numberponde20: number = 20;




  skeelznumber1: Skeelz;
  skeelznumber2: Skeelz;
  skeelznumber3: Skeelz;

  skeelzs: Array<Skeelz> = new Array<Skeelz>();
  comps: Array<Competence> = new Array<Competence>();
  skeelz3s: Array<Skeelz> = new Array<Skeelz>();


  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private sectionTableauDeBordHttpService: SectionTableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.tableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;

      this.listCoursSuivie()
      this.listCoursTermine()
      this.listCoursCree()
      this.listSkeelz();

    });

  }

  ngOnInit() {
  }

  listCoursSuivie() {

    return this.tableauDeBordHttpService.loadCoursSuivie(this.currentPersonne.id).subscribe(resp => this.coursSuivie = resp);

  }


  listCoursTermine() {

    return this.tableauDeBordHttpService.loadCoursTermine(this.currentPersonne.id).subscribe(resp => this.coursTermine = resp);
    ;

  }

  listCoursCree() {

    return this.tableauDeBordHttpService.loadCoursCree(this.currentPersonne.id).subscribe(resp => this.coursAdministre = resp);
    ;

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


  listSkeelz() {
    console.log("listSkeelzdzadzeafdze")
    this.sectionTableauDeBordHttpService.loadPersonneSkeelz(this.currentPersonne.id).subscribe(resp => {
      this.skeelzs = resp
          console.log("list3skeelz")
          console.log(this.skeelzs);

          for (let ske of this.skeelzs) { // je recupere mes skeelz
            console.log('je suis ske tour de boucle')
            console.log(ske)

            for (let compske of (ske.competenceSkeelzs)) { // je recupere mes competenceSkeelz
              console.log('je suis compske ')
              console.log(compske)

                for(let comp of compske.competences){ // je recupere mes competences


                  console.log('je suis comp ponde')
                  console.log(comp.ponderation) //mettre valeur ponderation en number

                  // @ts-ignore
                  if (comp.ponderation == "CINQ") {
                    this.tmp = this.tmp + this.numberponde5;
                  }
                  // @ts-ignore
                  else if (comp.ponderation == "DIX") {
                    this.tmp = this.tmp + this.numberponde10;
                    // @ts-ignore
                  } else if (comp.ponderation == "QUINZE") {
                    this.tmp = this.tmp + this.numberponde15;
                    // @ts-ignore
                  } else if (comp.ponderation == "VINGT") {
                    this.tmp = this.tmp + this.numberponde20;
                  }

                  if (this.number1 < this.tmp) {
                    this.number1 = this.tmp;
                    this.skeelznumber1 = ske;
                  } else if (this.number2 <= this.tmp) {
                    this.number2 = this.tmp;
                    this.skeelznumber2 = ske;
                  } else if (this.number3 <= this.tmp) {
                    this.number3 = this.tmp;
                    this.skeelznumber3 = ske;
                  }
                }
              }

            this.tmp = 0;
            }


        });
    }

//     this.sectionTableauDeBordHttpService.loadPersonneCompetence(this.currentPersonne.id).subscribe(resp => {
//       this.comps = resp
//       for (let comp of this.comps) {
//         // @ts-ignore
//         if (comp.ponderation == "CINQ") {
//           this.npteGlobal = this.npteGlobal + this.numberponde5;
//         }
//         // @ts-ignore
//         else if (comp.ponderation == "DIX") {
//           this.npteGlobal = this.npteGlobal + this.numberponde10;
//           // @ts-ignore
//         } else if (comp.ponderation == "QUINZE") {
//           this.npteGlobal = this.npteGlobal + this.numberponde15;
//           // @ts-ignore
//         } else if (comp.ponderation == "VINGT") {
//           this.npteGlobal = this.npteGlobal + this.numberponde20;
//         }
//
//       }
//
//     });
//
//   }
// }
}
