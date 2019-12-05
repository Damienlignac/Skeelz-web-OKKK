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

  id: number;
  agencement: number;
  chapitre: Chapitre;

  constructor(private route: ActivatedRoute, private chapitreHttpService: ChapitreHttpService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.agencement = params['agencement'];
      this.chapitreHttpService.findById(this.id, this.agencement).subscribe(resp => {
          this.chapitre = resp;
          console.log(this.chapitre);
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
