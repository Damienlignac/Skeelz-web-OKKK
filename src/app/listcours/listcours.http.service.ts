import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

import {Observable} from 'rxjs';
import {Difficulte} from '../model/difficulte';
import {Etat} from '../model/etat';


@Injectable({
  providedIn: 'root'
})
export class ListcoursHttpService {
  private courss: any;
  private difficultes: any;
  private skeelzs:any;





  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
    this.load3();


  }

  load() {
    this.http.get(this.appConfigService.backEnd + "cours/by-etat/OUVERT").subscribe(resp =>
      this.courss = resp);
  }
  load2() {
    this.http.get(this.appConfigService.backEnd + "cours/difficulte").subscribe(resp =>
      this.difficultes = resp);
  }
  load3() {
    this.http.get(this.appConfigService.backEnd + "skeelz").subscribe(resp =>
      this.skeelzs = resp);
  }
  search(){
    this.http.get(this.appConfigService.backEnd + 'cours').subscribe(resp => this.load());
  }





  findAll(): any {
    return this.courss;
  }
  findAllDifficulte(): any{
    return this.difficultes;
  }
  findAllSkeelz(): any{
    return this.skeelzs;
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

  findByDifficulte (difficulte :Difficulte, etat :Etat=Etat.OUVERT): Observable<any>{

    return this.http.get(this.appConfigService.backEnd + 'cours/by-difficulte/' + difficulte+'/' +etat);
  }

  findBySkeelz(id: number,  etat :Etat=Etat.OUVERT): Observable<any>{
    return this.http.get(this.appConfigService.backEnd +"skeelz/"+ id + "/courss/"+etat);
  }

  findIntroCours(id:number, agencement0:number=0){

    return this.http.get(this.appConfigService.backEnd +"module//FindByIdCoursAndAgencement/"+ id +":"+agencement0);
  }

  findCoursPersonneByPersonneAndCours(idPersonne: number, idCours: number): Observable<any>{
    return this.http.get(this.appConfigService.backEnd + 'CoursPersonne/personneAndCours/' + idPersonne + ":" + idCours);
  }


}
