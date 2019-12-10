import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';

@Injectable({
  providedIn: 'root'
})
export class ChapitreHttpService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  findById(id: number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'module/'+id+'/chapitres');
  }

  findByIdAndAgencement(id: number, agencement: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'chapitre/FindByIdModuleAndAgencement/' + id +":" + agencement);
  }

  findCoursPersonneByIdPersonne(idPersonne: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'CoursPersonne/personne/' + idPersonne);
  }


}
