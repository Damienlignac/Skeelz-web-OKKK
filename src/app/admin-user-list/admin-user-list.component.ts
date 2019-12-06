import {Component, OnInit} from '@angular/core';
import {Personne} from '../model/personne';
import {AdminUserListHttpService} from './admin-user-list-http.service';
import {Competence} from '../model/competence';

@Component({
  selector: 'app-personne',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  personne: Personne = null;
  personnes: Array<Personne>;
  constructor(private personneService: AdminUserListHttpService) {

  }


  ngOnInit() {

  }

  list(): any {
    this.personnes = this.personneService.findAll()
    return this.personnes
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
