import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  findByIdentifiantAndPassword(identifiant: string, password: string): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'utilisateur/identification/' + identifiant + ":" + password);
  }

  findAll(): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'utilisateur');
  }
}
