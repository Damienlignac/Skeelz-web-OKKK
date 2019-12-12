import {Component, OnInit} from '@angular/core';
import {TableauDeBordHttpService} from './tableau-de-bord-http-service';
import {Cours} from '../model/cours';
import {Skeelz} from '../model/skeelz';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Personne} from '../model/personne';
import {Competence} from '../model/competence';
import {SectionTableauDeBordHttpService} from '../section-tableau-de-bord/section-tableau-de-bord-http-service';
import {CompetenceSkeelz} from '../model/competenceSkeelz';
import {AdminUserListHttpService} from '../admin-user-list/admin-user-list-http.service';
import {Ponderation} from '../model/ponderation';

@Component({
  selector: 'tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  cours: any;
  max:number;
  maxIndex:number;

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

  topTroisScores: Array<number>;
  topTroisSkeelz: Array<Skeelz>;


  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private sectionTableauDeBordHttpService: SectionTableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute,private adminUserListService: AdminUserListHttpService) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.tableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      this.listSkeelz();
      if(this.currentPersonne.utilisateur.rh == true){
        this.utilisateurRH= true;
      }

      this.listCoursSuivie()
      this.listCoursTermine()
      this.listCoursCree()


    });

  }

  ngOnInit() {
  }

  //Table Employé
  list(): any {
    this.personnes = this.adminUserListService.findAll();
    return this.personnes;
  }

  chargeskeelzs() {
    this.skeelzarray = this.adminUserListService.findAllSkeelz();
    return this.skeelzarray;
  }

  filtreskeelz() {
    this.adminUserListService.findBySkeelz(this.idSkeelz).subscribe(resp => {
      this.personneSkeelz = resp;
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
    });
    return
      ;

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
    this.npteGlobal=0;
    this.listCoursSuivie();
    this.listCoursTermine();
    this.listCoursCree();
    this.listSkeelz();

  }

  Boutonemployes() {
    this.boutonMesCoursCompRH = false;
    this.boutonMesemployes = true;

  }

  listSkeelz() {
    this.tableauDeBordHttpService.findCompetenceSkeelzByIdPersonne(this.currentPersonne.id).subscribe(resp => {
      this.competenceSkeelz = resp;
      this.mesSkeelzUniques = new Array<Skeelz>();
      for (let compske of this.competenceSkeelz) { // je recupere mes compskeelz
        if ( this.mesSkeelzUniques == undefined || !this.mesSkeelzUniques.find(item => item.id == compske.skeelz.id)) {
          this.mesSkeelzUniques.push(compske.skeelz);
        }
      }
      this.listeScoreSkeelz = new Array<number>();
      for(let i: number=0; i < this.mesSkeelzUniques.length; i++) {
        this.listeScoreSkeelz.push(0);
      }
      for (let compske of this.competenceSkeelz) {
        let index: number;
        let points: number = 0;
        index = this.mesSkeelzUniques.findIndex(item => item.id == compske.skeelz.id);
        // @ts-ignore
        if (compske.competence.ponderation == Ponderation.CINQ) {
          points =  5;
        }
        // @ts-ignore
        else if (compske.competence.ponderation == Ponderation.DIX) {
          points = 10;
          // @ts-ignore
        } else if (compske.competence.ponderation == Ponderation.QUINZE) {
          points = 15;
          // @ts-ignore
        } else if (compske.competence.ponderation == Ponderation.VINGT) {
          points = 20;
        }
        this.listeScoreSkeelz[index] += points;
      }
      for(let score of this.listeScoreSkeelz) {
        this.npteGlobal += score;
      }
      this.topTroisScores = [0, 0, 0];
      this.topTroisSkeelz = new Array<Skeelz>();
      let maxTours: number;
      if(this.mesSkeelzUniques.length < 3) {
        maxTours = this.mesSkeelzUniques.length;
      } else {
        maxTours = 3;
      }
      if(maxTours > 0) {
        for(let j: number = 0; j < maxTours; j ++){
          let indexMax: number;
          indexMax = this.indexOfMax(this.listeScoreSkeelz)
          this.topTroisScores[j] = this.listeScoreSkeelz[indexMax];
          this.topTroisSkeelz[j] = this.mesSkeelzUniques[indexMax];
          this.listeScoreSkeelz[indexMax] = 0;
        }
      }
    });

  }

    indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return maxIndex;
  }
}
