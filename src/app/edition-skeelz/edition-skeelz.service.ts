import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class EditionSkeelzService {


  private skeelzs: any;
  private competences: any;
  private compSkeelzs: any;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
    this.load2();
    this.load3();
  }

  load() {
    this.http.get(this.appConfigService.backEnd + 'skeelz').subscribe(resp => {
      this.skeelzs = resp;
      console.log(this.skeelzs);
    });
  }

  load2() {
    this.http.get(this.appConfigService.backEnd + 'competence').subscribe(resp => {
      this.competences = resp;
      console.log(this.competences);
    });
  }
  load3() {
    this.http.get(this.appConfigService.backEnd + 'competenceSkeelz').subscribe(resp => {
      this.compSkeelzs = resp;
      console.log(this.competences);
    });
  }
  findAllSkeelz() {
    return this.skeelzs;
  }

}
