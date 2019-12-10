import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';
import {Skeelz} from '../model/skeelz';

@Injectable({
  providedIn: 'root'
})
export class AdminUserListHttpService {
  private personnes: any;
  private skeelzs: Array<Skeelz>;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get(this.appConfigService.backEnd + 'personne').subscribe(resp => {
      this.personnes = resp;
    });
  }


  findAll(): any {
    return this.personnes;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'personne/' + id);
  }

  findAllSkeelzs(): any {
    return this.skeelzs;
  }


}

