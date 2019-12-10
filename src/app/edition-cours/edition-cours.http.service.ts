import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {Etat} from '../model/etat';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditionCoursHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService, private route: ActivatedRoute) {
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
  findCompetence(): Observable<any>{

    return this.http.get(this.appConfigService.backEnd + 'competence');
  }



}

