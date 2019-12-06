import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Chapitre} from '../model/chapitre';
import {ChapitreHttpService} from './chapitre-http.service';
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
  currentModule: Module;
  previousModule: Module;
  dernierModule: boolean;
  premierModule: boolean;
  secondModule: Module;


  constructor(private route: ActivatedRoute, private chapitreHttpService: ChapitreHttpService, private sommaireHttpService: SommaireHttpService) {
    this.route.params.subscribe(params => {
      this.idCours = params['idCours'];
      this.idModule = params['idModule'];
      this.agencement = params['agencementCh'];
      this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
        this.mesModules = resp;
        let filtreCurrentModule = this.mesModules.filter(item => item.id == this.idModule);
        this.currentModule = filtreCurrentModule[0];
        console.log(this.currentModule);
        if (this.currentModule.agencement == 0) {
          this.premierModule = true;
          let filtreSecondModule = this.mesModules.filter(item => item.agencement == 1);
          this.secondModule = filtreSecondModule[0];
          console.log("C est le premier module : " + this.premierModule)
        } else {
          this.premierModule = false;
          let filtrePreviousModule = this.mesModules.filter(item => item.agencement == (this.currentModule.agencement - 1));
          this.previousModule = filtrePreviousModule[0];
        }
        if ((this.currentModule.agencement + 1) == this.mesModules.length) {
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
