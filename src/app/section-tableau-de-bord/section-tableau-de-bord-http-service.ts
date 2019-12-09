import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

import {Observable} from 'rxjs';
import {Difficulte} from '../model/difficulte';
import {Etat} from '../model/etat';
import {Personne} from '../model/personne';
import {AuthService} from '../auth.service';
import {ActivatedRoute} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SectionTableauDeBordHttpService {



  constructor(private http: HttpClient, private appConfigService: AppConfigService,public authService: AuthService,private route: ActivatedRoute) {

  }

  findByUtilisateur(id:number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + id);
  }

  loadPersonneSkeelz(id:number): Observable<any> {
  return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/skeelzs");
}
  loadPersonneCompetence(id:number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/competences");
  }
}
