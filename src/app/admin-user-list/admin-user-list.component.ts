import {Component, OnInit} from '@angular/core';
import {Personne} from '../model/personne';
import {AdminUserListHttpService} from './admin-user-list-http.service';
import {Skeelz} from '../model/skeelz';

@Component({
  selector: 'app-personne',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  personne: Personne = null;
  personnes: Array<Personne>;
  skeelzs: Array<Skeelz>;
  valeur: any;

  constructor(private adminUserListService: AdminUserListHttpService) {

  }


  ngOnInit() {

  }

  list(): any {
    this.personnes = this.adminUserListService.findAll();
    return this.personnes;
  }


  chargeskeelz(): any {
    this.skeelzs = this.adminUserListService.findAllSkeelzs();
    return this.skeelzs;
  }

}
