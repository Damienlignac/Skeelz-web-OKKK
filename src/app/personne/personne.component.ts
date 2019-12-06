import {Component, OnInit} from '@angular/core';
import {Personne} from '../model/personne';
import {PersonneHttpService} from './personne-http.service';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {

  personne: Personne = null;

  constructor(private personneService: PersonneHttpService) {



  }


  ngOnInit() {

  }

  list(): any {
    return this.personneService.findAll();
  }


  add() {
    this.personne = new Personne();
  }

  edit(id: number) {
    this.personneService.findById(id).subscribe(resp => this.personne = resp);

  }

  delete(id: number) {
    this.personneService.deleteBydId(id);
  }

  cancel() {
    this.personne = null;
  }

}
