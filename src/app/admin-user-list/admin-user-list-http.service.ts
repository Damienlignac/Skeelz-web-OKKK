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
  private skeelzs: any;
  private utilisateurs: any;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load3();
    this.load();
    this.load2();
  }

  load() {
    this.http.get(this.appConfigService.backEnd + 'personne').subscribe(resp => {
      this.personnes = resp;
    });
  }
  load3() {
    this.http.get(this.appConfigService.backEnd + 'utilisateur').subscribe(resp => {
      this.utilisateurs = resp;
    });
  }


  findAll(): any {
    return this.personnes;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'personne/' + id);
  }

load2(){
  this.http.get(this.appConfigService.backEnd + 'skeelz').subscribe(resp => {
    this.skeelzs = resp;
  });
}

findAllSkeelz(){
    return this.skeelzs;
}
findBySkeelz(id: number): Observable <any> {
  return this.http.get(this.appConfigService.backEnd + 'skeelz/' + id + '/personnes');
}
findAllUtilisateur(){
    return this.utilisateurs;
}
}

