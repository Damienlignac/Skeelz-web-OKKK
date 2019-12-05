import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';

@Injectable({
  providedIn: 'root'
})
export class EditionCoursHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id + '/modules/chapitres');
  }

  findByIdModule(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'module/' + id );
  }

  findById2(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id);
  }
  findByIdElement(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'chapitre/' + id+ '/elementDeCourss');
  }


  saveCours(cours: Cours, module: Module){
    if (cours.id) {
      this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => {
        if (resp instanceof Cours) {
          module.cours = resp;
        }

      });
      console.log(module.cours.id)
    } else {
      this.http.post(this.appConfigService.backEnd + 'cours/', cours)
    }
  }

  saveModule(module: Module){
    if (module.id) {
      this.http.put(this.appConfigService.backEnd + 'cours/' + module.id, module).subscribe();
    } else {
      this.http.post(this.appConfigService.backEnd + 'cours/', module).subscribe();
    }
  }
  saveChapitre(chapitre: Chapitre){

  }
  saveElement(element: ElementDeCours){

  }
}
