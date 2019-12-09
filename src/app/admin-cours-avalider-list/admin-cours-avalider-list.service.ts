import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';
import {Personne} from '../model/personne';

@Injectable({
  providedIn: 'root'
})
export class AdminCoursAValiderListService {

  private courss: any;
  private coursenattentes: any;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
   this.load()
  }

  load() {
    this.http.get(this.appConfigService.backEnd + 'cours').subscribe(resp => {
      console.log(resp);
      this.courss = resp;
    });
  }
  findAllEnAttente(){
    this.http.get(this.appConfigService.backEnd + 'cours/by-etat/ATTENTE').subscribe(resp => {
      console.log(resp);
      this.coursenattentes = resp;
    });
  }
}
