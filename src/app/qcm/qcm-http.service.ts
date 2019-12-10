import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QcmHttpService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  findQuestionsWithReponsesById(id: number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'module/'+id+'/questionsAndReponses');
  }

  findByIdPersonneAndIdModule(idPersonne: number, idModule: number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'qcmPersonne/by-personne-and-module/' + idPersonne + ":" + idModule);
  }

  findByIdPersonne(idPersonne: number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'qcmPersonne/by-personne/' + idPersonne);
  }

  findByIdPersonneAndIdCours(idPersonne: number, idCours: number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'qcmPersonne/personne/cours/' + idPersonne +":" + idCours);
  }
}
