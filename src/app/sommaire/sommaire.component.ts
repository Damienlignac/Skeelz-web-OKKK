import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SommaireHttpService} from './sommaire-http-service';
import {Module} from '../model/module';

@Component({
  selector: 'app-sommaire',
  templateUrl: './sommaire.component.html',
  styleUrls: ['./sommaire.component.css']
})
export class SommaireComponent implements OnInit {

  idCours:number;
  moduleAndChap: Array<Module>;



  constructor(private route: ActivatedRoute, private sommaireHttpService: SommaireHttpService) {
    this.route.params.subscribe(params => {this.idCours = params['id']; })
    this.sommaireHttpService.findById(this.idCours).subscribe(resp => {
      this.moduleAndChap = resp
    });
  }

  compare(a, b) {
    const bandA = a.agencement;
    const bandB = b.agencement;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    }
    else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  ngOnInit() {

  }

}
