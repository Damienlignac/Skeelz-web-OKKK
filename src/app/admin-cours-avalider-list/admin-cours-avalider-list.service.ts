import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCoursAValiderListService {

  private courss: any;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load()

  }

  load() {
    this.http.get(this.appConfigService.backEnd + "cours/by-etat/ATTENTE").subscribe(resp =>
      this.courss = resp);
  }

  findAll(): any {
    return this.courss;
  }
}
