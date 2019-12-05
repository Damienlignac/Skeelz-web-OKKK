import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Chapitre} from '../model/chapitre';
import {ChapitreHttpService} from './chapitre-http.service';
import {ElementDeCours} from '../model/elementDeCours';
import {Module} from '../model/module';
import {SommaireHttpService} from '../sommaire/sommaire-http-service';

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {

  idCours: number;
  idModule: number;
  agencement: number;
  chapitre: Chapitre;
  listeChapitres: Array<Chapitre>;
  dernierChapitre: boolean;
  premierChapitre: boolean;
  mesModules: Array<Module>;
  currentModule: Module[];
  dernierModule: boolean;
  premierModule: boolean;


  constructor(private route: ActivatedRoute, private chapitreHttpService: ChapitreHttpService, private sommaireHttpService: SommaireHttpService) {
    this.route.params.subscribe(params => {
      this.idCours = params['idCours'];
      this.idModule = params['idModule'];
      this.agencement = params['agencementCh'];
      this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
        this.mesModules = resp;
        this.currentModule = this.mesModules.filter(item => item.id == this.idModule);
        console.log(this.currentModule);
        if (this.currentModule[0].agencement == 0) {
          this.premierModule = true;
          console.log("C est le premier module : " + this.premierModule)
        } else {
          this.premierModule = false;
        }
        if ((this.currentModule[0].agencement + 1) == this.mesModules.length) {
          this.dernierModule = true;
        } else {
          this.dernierModule = false;
        }

      });
      this.chapitreHttpService.findByIdAndAgencement(this.idModule, this.agencement).subscribe(resp => {
          this.chapitre = resp;
          this.chapitreHttpService.findById(this.idModule).subscribe(resp => {
            this.listeChapitres = resp;
            if ((this.chapitre.agencement + 1) == this.listeChapitres.length) {
              this.dernierChapitre = true;
            } else {
              this.dernierChapitre = false;
            }
            ;
            if (this.chapitre.agencement == 0) {
              this.premierChapitre = true;
            } else {
              this.premierChapitre = false;
            }
            ;
          });
        }
      );

    });
  }

  ngOnInit() {


    // if (this.chapitre.elementDeCours === undefined) {
    //   this.chapitre.elementDeCours = new ElementDeCours(null, null, 'Paragraphe');
    // }
  }

}
