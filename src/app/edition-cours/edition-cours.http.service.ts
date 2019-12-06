import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';
import {Module} from '../model/module';

@Injectable({
  providedIn: 'root'
})
export class EditionCoursHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id + '/modules/chapitres');
  }

  findById2(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id);
  }
  findByIdElement(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'chapitre/' + id+ '/elementDeCourss');
  }

  saveModule(module: Module){
    this.http.post(this.appConfigService.backEnd+ 'module/',module).subscribe()
  }
}
