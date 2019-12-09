import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

import {Observable} from 'rxjs';
import {Difficulte} from '../model/difficulte';
import {Etat} from '../model/etat';
import {Personne} from '../model/personne';


@Injectable({
  providedIn: 'root'
})
export class TableauDeBordHttpService {
  private courss: any;
  idUtilisateur: number;
  currentPersonne: Personne;

  private skeelzs:any;
  private idPersonne:number;





  constructor(private http: HttpClient, private appConfigService: AppConfigService) {

    this.idUtilisateur = +localStorage.getItem('token');
    this.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      console.log(this.currentPersonne);

    this.loadCoursSuivie(this.currentPersonne.id);
    this.loadCoursTermine(this.currentPersonne.id);
    this.loadCoursCree(this.currentPersonne.id);
    this.loadPersonneSkeelz(this.currentPersonne.id);
  });
  }

  findByUtilisateur(id:number): Observable<any>{

      return this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + id);
  }



  loadCoursSuivie(id:number) {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/courss/SUIVIE").subscribe(resp =>
      this.courss = resp);
  }
  loadCoursTermine(id:number) {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/courss/VALIDE").subscribe(resp =>
      this.courss = resp);
  }
  loadCoursCree(id:number) {
    this.http.get(this.appConfigService.backEnd + "personne/"+this.idPersonne+"/courss/ADMISNISTRE").subscribe(resp =>
      this.courss = resp);
  }

  loadPersonneSkeelz(id:number) {
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
