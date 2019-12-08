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
  competences: any;
  valeur: any;

  constructor(private adminUserListService: AdminUserListHttpService) {

  }


  ngOnInit() {

  }

  list(): any {
    this.personnes = this.adminUserListService.findAll();
    return this.personnes;
  }


  chargeCompetences(): any {
    this.competences = this.adminUserListService.findAllCompetences();
    return this.competences;
  }


  add() {
    this.personne = new Personne();
  }

  edit(id: number) {
    this.adminUserListService.findById(id).subscribe(resp => this.personne = resp);

  }

  delete(id: number) {
    this.adminUserListService.deleteBydId(id);
  }

  cancel() {
    this.personne = null;
  }

}
