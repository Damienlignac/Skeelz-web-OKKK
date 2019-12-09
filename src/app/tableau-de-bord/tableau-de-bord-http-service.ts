import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

import {Observable} from 'rxjs';
import {Difficulte} from '../model/difficulte';
import {Etat} from '../model/etat';


@Injectable({
  providedIn: 'root'
})
export class TableauDeBordHttpService {
  private courss: any;

  private skeelzs:any;
  private idPersonne:number;





  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.loadCoursSuivie();
    this.loadCoursTermine();
    this.loadCoursCree();
    this.loadPersonneSkeelz();

  }

  loadCoursSuivie() {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/courss/SUIVIE").subscribe(resp =>
      this.courss = resp);
  }
  loadCoursTermine() {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/courss/VALIDE").subscribe(resp =>
      this.courss = resp);
  }
  loadCoursCree() {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/courss/ADMISNISTRE").subscribe(resp =>
      this.courss = resp);
  }

  loadPersonneSkeelz() {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/skeelz").subscribe(resp =>
      this.skeelzs = resp);
  }


  findAllCoursSuivie(): any {
    return this.courss;
  }
  findAllCoursTermine(): any {
    return this.courss;
  }
  findAllCoursCreer(): any {
    return this.courss;
  }
  findAllPersonneSkeelz(): any {
    return this.courss;
  }


  findIntroCours(id:number, agencement0:number=0){

    return this.http.get(this.appConfigService.backEnd +"module/FindByIdCoursAndAgencement/"+ id +":"+agencement0);
  }


}
