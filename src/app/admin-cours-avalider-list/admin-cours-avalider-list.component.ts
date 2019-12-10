import {Component, OnInit} from '@angular/core';
import {AdminCoursAValiderListService} from './admin-cours-avalider-list.service';
import {Cours} from '../model/cours';
import {Etat} from '../model/etat';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';


@Component({
  selector: 'app-admin-cours-avalider-list',
  templateUrl: './admin-cours-avalider-list.component.html',
  styleUrls: ['./admin-cours-avalider-list.component.css']
})
export class AdminCoursAValiderListComponent implements OnInit {
  private courvalide: Cours;
  private  aucun = false;
  private courss: Array<Cours>;


  constructor(private coursAValiderListService: AdminCoursAValiderListService, private http: HttpClient, private appConfigService: AppConfigService) {
  }

  ngOnInit() {
  }

  list() {
   this.courss =  this.coursAValiderListService.findAll();
    if (this.courss.length == 0){
      this.aucun = true;
    }else{ this.aucun = false;}
   return this.courss;
  }

  valider(id: number) {
    alert("Ce cours sera désormais accessible pour les autres utilisateurs.")
    return this.coursAValiderListService.findById(id).subscribe(resp => {
      this.courvalide = resp;
      this.courvalide.etat = Etat.OUVERT;
      console.log(this.courvalide);
      this.http.put(this.appConfigService.backEnd + "cours/" + this.courvalide.id, this.courvalide).subscribe( resp => {
        this.coursAValiderListService.load();
      });
    });
  }
}
