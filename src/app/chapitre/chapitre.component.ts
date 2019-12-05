import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Chapitre} from '../model/chapitre';
import {ChapitreHttpService} from './chapitre-http.service';
import {ElementDeCours} from '../model/elementDeCours';

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {

  idModule: number;
  agencement: number;
  chapitre: Chapitre;
  nbChapitre: number;
  listeChapitres: Array<Chapitre>;
  dernierChapitre: boolean;
  premierChapitre: boolean;

  constructor(private route: ActivatedRoute, private chapitreHttpService: ChapitreHttpService) {
    this.route.params.subscribe(params => {
      this.idModule = params['id'];
      this.agencement = params['agencement'];
      this.chapitreHttpService.findByIdAndAgencement(this.idModule, this.agencement).subscribe(resp => {
          this.chapitre = resp;
          console.log(this.chapitre);
          this.chapitreHttpService.findById(this.idModule).subscribe(resp => {
            this.listeChapitres = resp;
            console.log(this.listeChapitres);
            console.log(this.chapitre);
            if ((this.chapitre.agencement + 1) == this.listeChapitres.length) {
              this.dernierChapitre = true;
            } else {
              this.dernierChapitre = false;
            };
            if (this.chapitre.agencement == 0) {
              this.premierChapitre = true;
            } else {
              this.premierChapitre = false;
            };
            console.log('C\'est le dernier chapitre : ' + this.dernierChapitre);
            console.log('C\'est le premier chapitre : ' + this.premierChapitre);
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
