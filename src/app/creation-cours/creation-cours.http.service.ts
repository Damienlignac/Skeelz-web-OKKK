import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {Etat} from '../model/etat';

@Injectable({
  providedIn: 'root'
})
export class CreationCoursHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }
  findByUtilisateur(id:number): Observable<any>{

    return this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + id);
  }
}
