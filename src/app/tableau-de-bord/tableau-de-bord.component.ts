import {Component, OnInit} from '@angular/core';
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
import {CompetenceSkeelz} from '../model/competenceSkeelz';
import {AdminUserListHttpService} from '../admin-user-list/admin-user-list-http.service';

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
  utilisateurRH: boolean = false;
  boutonMesCoursCompRH: boolean = true;
  boutonMesemployes: boolean = false;
  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  skeelznumber1: Skeelz;
  skeelznumber2: Skeelz;
  skeelznumber3: Skeelz;
  tmp: number = 0;
  npteGlobal: number = 0;
  numberponde5: number = 5;
  numberponde10: number = 10;
  numberponde15: number = 15;
  numberponde20: number = 20;
  competenceSkeelz: Array<CompetenceSkeelz> = new Array<CompetenceSkeelz>();
  skeelz: Skeelz;
  mesSkeelzUniques: Array<Skeelz>;
  listeScoreSkeelz: Array<number>;
  skeelzs: Array<Skeelz> = new Array<Skeelz>();
  comps: Array<Competence> = new Array<Competence>();
  skeelz3s: Array<Skeelz> = new Array<Skeelz>();
  edCours: Cours;

  //Table Employé
  personne: Personne = null;
  personnes: Array<Personne>;
  skeelzarray: Array<Skeelz>;
  idSkeelz: number;
  personneSkeelz: Array<Personne> = new Array<Personne>();


  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private sectionTableauDeBordHttpService: SectionTableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute, private adminUserListService: AdminUserListHttpService) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.tableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      if (this.currentPersonne.utilisateur.rh == true) {
        this.utilisateurRH = true;
      }

      this.listCoursSuivie();
      this.listCoursTermine();
      this.listCoursCree();
      this.listSkeelz();

    });

  }

  ngOnInit() {
  }

  //Table Employé
  list(): any {
    this.personnes = this.adminUserListService.findAll();

    console.log(this.personnes);
    return this.personnes;
  }

  chargeskeelzs() {
    this.skeelzarray = this.adminUserListService.findAllSkeelz();
    return this.skeelzarray;
  }

  filtreskeelz() {
    this.adminUserListService.findBySkeelz(this.idSkeelz).subscribe(resp => {
      this.personneSkeelz = resp;
      console.log(this.personneSkeelz);
      return this.personneSkeelz;
    });
  }


//Table Cours
  listCoursSuivie() {

    return this.tableauDeBordHttpService.loadCoursSuivie(this.currentPersonne.id).subscribe(resp => this.coursSuivie = resp);

  }


  listCoursTermine() {

    return this.tableauDeBordHttpService.loadCoursTermine(this.currentPersonne.id).subscribe(resp => this.coursTermine = resp);
    ;

  }

  listCoursCree() {
    this.tableauDeBordHttpService.loadCoursCree(this.currentPersonne.id).subscribe(resp => {
      this.coursAdministre = resp;
      console.log(this.coursAdministre);
    });
    return
      ;

  }

  listSkeelz() {
    this.tmp = 0;
    this.number1 = 0;
    this.number2 = 0;
    this.number3 = 0;
    this.npteGlobal = 0;
    this.skeelznumber1 = null;
    this.skeelznumber2 = null;
    this.skeelznumber3 = null;

    console.log('listSkeelz');
    this.tableauDeBordHttpService.loadPersonneSkeelz(this.currentPersonne.id).subscribe(resp => {
      this.skeelzs = resp;
      this.tableauDeBordHttpService.loadPersonneCompetence(this.currentPersonne.id).subscribe(resp => {
          this.comps = resp;
          console.log('list3skeelz');
          console.log(this.skeelzs);
          console.log(this.comps);
          for (let ske of this.skeelzs) { // je recupere mes skeelz
            for (let skecompske of ske.competenceSkeelz) {
              console.log('je suis ske tour de boucle');
              console.log(ske);
              for (let comp of this.comps) { // je recupere mes comptence

                console.log(comp.competenceSkeelz);
                console.log('je suis comp');
                console.log(comp);


                for (let compskecomp of comp.competenceSkeelz) {
                  if (skecompske.id == compskecomp.id) {
                    console.log('je suis comp ponde');
                    console.log(comp.ponderation); //mettre valeur ponderation en number
                    // @ts-ignore
                    if (comp.ponderation == 'CINQ') {
                      this.tmp = this.tmp + this.numberponde5;
                      // @ts-ignore
                    } else if (comp.ponderation == 'DIX') {
                      this.tmp = this.tmp + this.numberponde10;
                      // @ts-ignore
                    } else if (comp.ponderation == 'QUINZE') {
                      this.tmp = this.tmp + this.numberponde15;
                      // @ts-ignore
                    } else if (comp.ponderation == 'VINGT') {
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
            }

          }
        }
      );
    });

    this.sectionTableauDeBordHttpService.loadPersonneCompetence(this.currentPersonne.id).subscribe(resp => {
      this.comps = resp;
      for (let comp of this.comps) {
        // @ts-ignore
        if (comp.ponderation == 'CINQ') {
          this.npteGlobal = this.npteGlobal + this.numberponde5;
        }
        // @ts-ignore
        else if (comp.ponderation == 'DIX') {
          this.npteGlobal = this.npteGlobal + this.numberponde10;
          // @ts-ignore
        } else if (comp.ponderation == 'QUINZE') {
          this.npteGlobal = this.npteGlobal + this.numberponde15;
          // @ts-ignore
        } else if (comp.ponderation == 'VINGT') {
          this.npteGlobal = this.npteGlobal + this.numberponde20;
        }

      }

    });


  }

  introCours(idCours: number) {
    this.tableauDeBordHttpService.findIntroCours(idCours, 0).subscribe(resp => {
      this.module0 = resp;
      this.router.navigate(['/chapitre/' + [idCours] + '/' + this.module0.id + '/0']);
    });
  }

  editionCours(edCours: Cours) {
    // @ts-ignore
    if (edCours.etat == 'ATTENTE') {
      alert('Ce cours est en attente de validation, renseignez-vous auprès de l\'administrateur pour ajouter des modifications');
// @ts-ignore
    } else if (edCours.etat == 'FERME') {
      this.tableauDeBordHttpService.findIntroCours(edCours.id).subscribe(resp => {
        this.cours = resp;


        this.router.navigate(['/editionCours/' + [edCours.id]]);
      });
    } else {
      this.introCours(edCours.id);
    }
  }

  //Boutons pour le point de vue RH


  boutonMesCoursComp() {
    this.boutonMesCoursCompRH = true;
    this.boutonMesemployes = false;

    this.npteGlobal = 0;
    this.skeelznumber1 = null;
    this.skeelznumber2 = null;
    this.skeelznumber3 = null;
    this.number1 = 0;
    this.number2 = 0;
    this.number3 = 0;

    this.listCoursSuivie();
    this.listCoursTermine();
    this.listCoursCree();
    this.listSkeelz();

  }

  Boutonemployes() {
    this.boutonMesCoursCompRH = false;
    this.boutonMesemployes = true;

  }


  // listSkeelz() { // List de tous les Skeelz (tableau de skeelz dont l'index est similaire a un tableau de nombre (somme des pondération des compétences associé au skeelz)
  //   console.log("listSkeelzdzadzeafdze")
  //   this.tableauDeBordHttpService.findCompetenceSkeelzByIdPersonne(this.currentPersonne.id).subscribe(resp => {
  //     this.competenceSkeelz = resp
  //     console.log("list3skeelz")
  //
  //
  //     for (let compske of this.competenceSkeelz) { // je recupere mes skeelz
  //       if ( !this.mesSkeelzUniques.find(item => item.id == compske.skeelz.id)) {
  //         this.mesSkeelzUniques.push(compske.skeelz);
  //       }
  //     }
  //
  //     this.listeScoreSkeelz = new Array<number>();
  //     for(let i: number=0; i < this.mesSkeelzUniques.length; i++) {
  //       this.listeScoreSkeelz.push(0);
  //
  //     }
  //     console.log((this.listeScoreSkeelz));
  //     console.log(this.competenceSkeelz);
  //     for (let compske of this.competenceSkeelz) {
  //       let index: number;
  //       let points: number = 0;
  //       index = this.mesSkeelzUniques.findIndex(item => item.id == compske.skeelz.id);
  //       console.log(index);
  //       // @ts-ignore
  //       if (compske.competence.ponderation == "CINQ") {
  //         points =  this.numberponde5;
  //       }
  //       // @ts-ignore
  //       else if (compske.competence.ponderation == "DIX") {
  //         points = this.numberponde10;
  //         // @ts-ignore
  //       } else if (compske.competence.ponderation == "QUINZE") {
  //         points = this.numberponde15;
  //         // @ts-ignore
  //       } else if (compske.competence.ponderation == "VINGT") {
  //         points = this.numberponde20;
  //       }
  //       console.log(this.mesSkeelzUniques)
  //       console.log( this.listeScoreSkeelz)
  //       this.listeScoreSkeelz[index] += points;
  //     }
  //   });
  // }


}
