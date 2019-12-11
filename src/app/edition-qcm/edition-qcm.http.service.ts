import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditionQcmHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }

  findByIdModule(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'module/' + id );
  }

  findQuestionReponses(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'module/' + id +'/questionsAndReponses');
  }

  findById2(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id);
  }




}

