import {Injectable} from '@angular/core';
import {Evaluation} from '../model/evaluation';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfigService} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SommaireHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + id + '/modules/chapitres');
  }

}
