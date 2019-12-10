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
  skeelzarray: Array<Skeelz>;
  idSkeelz: number;
  personneSkeelz: Array<Personne> = new Array<Personne>();

  constructor(private adminUserListService: AdminUserListHttpService) {
  }


  ngOnInit() {

  }

  list(): any {
    this.personnes = this.adminUserListService.findAll();
    return this.personnes;
  }

  chargeskeelzs(){
    this.skeelzarray = this.adminUserListService.findAllSkeelz();
    return this.skeelzarray;
  }

  filtreskeelz(){
 this.adminUserListService.findBySkeelz(this.idSkeelz).subscribe(resp=>{
   this.personneSkeelz = resp;
   console.log(this.personneSkeelz);
   return this.personneSkeelz;
 });
  }




}
