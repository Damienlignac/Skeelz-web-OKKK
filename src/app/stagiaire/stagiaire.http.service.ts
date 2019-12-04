import {Injectable, Optional} from '@angular/core';
import {Stagiaire} from '../model/stagiaire';
import {Adresse} from '../model/adresse';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Evaluation} from '../model/evaluation';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StagiaireHttpService {
 private stagiaires: any;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get(this.appConfigService.backEnd + "stagiaire").subscribe(resp =>
      this.stagiaires = resp);
  }

  findAll(): any {
    return this.stagiaires;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'stagiaire/' + id);
  }

  save(stagiaire: Stagiaire) {
    if (stagiaire.id) {
      this.http.put(this.appConfigService.backEnd + 'stagiaire/' + stagiaire.id, stagiaire).subscribe(resp => this.load());
    } else {
      this.http.post(this.appConfigService.backEnd + 'stagiaire/', stagiaire).subscribe(resp => this.load());
    }
  }

  deleteBydId(id: number) {
    this.http.delete(this.appConfigService.backEnd + 'stagiaire/' + id).subscribe(resp => this.load());
  }
}
