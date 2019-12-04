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
  }

  ngOnInit() {
    this.sommaireHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
  }

}
