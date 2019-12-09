import { Component, OnInit } from '@angular/core';
import {TableauDeBordHttpService} from '../tableau-de-bord/tableau-de-bord-http-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Personne} from '../model/personne';
import {Skeelz} from '../model/skeelz';
import {SectionTableauDeBordHttpService} from './section-tableau-de-bord-http-service';
import {Competence} from '../model/competence';

@Component({
  selector: 'section-tableau-de-bord',
  templateUrl: './section-tableau-de-bord.component.html',
  styleUrls: ['./section-tableau-de-bord.component.css']
})
export class SectionTableauDeBordComponent implements OnInit {
  idUtilisateur: number;
  currentPersonne: Personne;
  number1:number=0;
  number2:number=0;
  number3:number=0;
  tmp:number=0;
  loop:boolean=true;

  skeelznumber1: Skeelz;
  skeelznumber2: Skeelz;
  skeelznumber3: Skeelz;

  skeelzs: Array<Skeelz>=new Array<Skeelz>();
  comps: Array<Competence> =new Array<Competence>();
  skeelz3s: Array<Skeelz>=new Array<Skeelz>();


  constructor(private sectionTableauDeBordHttpService: SectionTableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.sectionTableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;

      this.listSkeelz();

    });
  }

  ngOnInit() {

  }



  listSkeelz() {
    console.log("listSkeelz")
    this.sectionTableauDeBordHttpService.loadPersonneSkeelz(this.currentPersonne.id).subscribe(resp => {this.skeelzs = resp
      this.sectionTableauDeBordHttpService.loadPersonneCompetence(this.currentPersonne.id).subscribe(resp =>{
        this.comps = resp


              console.log("list3skeelz")
              console.log(this.skeelzs);
              console.log(this.comps);
              for(let ske of this.skeelzs){ // je recupere mes skeelz
                console.log(ske)
                console.log('je suis ske')
                for (let comp of this.comps) {
                  console.log(comp);
                  console.log("je suis comp")
                  for(let compske of  comp.competenceSkeelzs){ // je recupere les skeelz lié a la comp
                    if(ske == compske.skeelz){
                      this.tmp = this.tmp + comp.ponderation; // j'affecte ma variable temp au point de ma comptence je dois remetrre cette vraiable a 0 quand je chope un autre skeelz
                      if(this.number1 < this.tmp) {
                        this.number1 = this.tmp;
                        this.skeelznumber1 = ske;
                      }
                      else if (this.number2 < this.tmp) {
                        this.number2 = this.tmp;
                        this.skeelznumber2 = ske;
                      }
                      else if (this.number3 < this.tmp) {
                        this.number3 = this.tmp;
                        this.skeelznumber3 = ske;
                      }
                    }
                  }
                }
                this.tmp=0;
              }
        }
      );
    });
    console.log(this.skeelzs)
  }
//   listComp() {
//     console.log("listComp")
//     this.sectionTableauDeBordHttpService.loadPersonneCompetence(this.currentPersonne.id).subscribe(resp =>
//       this.comps = resp
//     );
//     console.log(this.comps)
//   }
//
//   chargelist3(){
//
//     if(this.comps !=null  && this.skeelzs !=null && this.loop==true){
//       this.list3skeelz()
//       this.loop=false
//     }
//     else{
//
//       this.chargelist3()
//     }
//   }
//
//   list3skeelz(){
//     if(this.loop==false){
// console.log("list3skeelz")
//     console.log(this.skeelzs);
//     console.log(this.comps);
//     for(let ske of this.skeelzs){ // je recupere mes skeelz
//      for (let comp of this.comps) {
//        for(let compske of comp.competenceSkeelzs){ // je recupere les skeelz lié a la comp
//            if(ske == compske.skeelz){
//             this.tmp = this.tmp + comp.ponderation; // j'affecte ma variable temp au point de ma comptence je dois remetrre cette vraiable a 0 quand je chope un autre skeelz
//             if(this.number1 < this.tmp) {
//             this.number1 = this.tmp;
//             this.skeelznumber1 = ske;
//           }
//              else if (this.number2 < this.tmp) {
//               this.number2 = this.tmp;
//               this.skeelznumber2 = ske;
//             }
//             else if (this.number3 < this.tmp) {
//               this.number3 = this.tmp;
//               this.skeelznumber3 = ske;
//             }
//           }
//         }
//       }
//      this.tmp=0;
//     }
//   }
//
//
// }



}
