import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Chapitre} from '../model/chapitre';
import {Paragraphe} from '../model/paragraphe';
import {ChapitreHttpService} from './chapitre-http.service';

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
      this.agencement = params['agencement']
    });
  }

  ngOnInit() {
    this.chapitreHttpService.findById(this.id, this.agencement).subscribe(resp => this.chapitre = resp)
  }

}
