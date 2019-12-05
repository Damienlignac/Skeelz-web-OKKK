import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ListcoursHttpService {
 private courss: any;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
  }

  load() {

    this.http.get(this.appConfigService.backEnd + "cours").subscribe(resp =>
      this.courss = resp);
  }

  findAll(): any {
    return this.courss;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'cours/' + id);
  }

  // save(stagiaire: Stagiaire) {
  //   if (cours.id) {
  //     this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => this.load());
  //   } else {
  //     this.http.post(this.appConfigService.backEnd + 'cours/', cours).subscribe(resp => this.load());
  //   }
  // }

  deleteBydId(id: number) {
    this.http.delete(this.appConfigService.backEnd + 'cours/' + id).subscribe(resp => this.load());
  }
}
