import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Etat} from '../model/etat';
import {Observable} from 'rxjs';
import {Cours} from '../model/cours';

@Injectable({
  providedIn: 'root'
})
export class AdminCoursAValiderListService {

  private courss: any;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load()

  }

  load(){
    return this.http.get(this.appConfigService.backEnd + "cours/by-etat/ATTENTE").subscribe(resp => {
      this.courss = resp;
    });
  }

  findAll(){
    return this.courss;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + "cours/" + id);
  }


}
