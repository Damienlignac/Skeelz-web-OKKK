import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

import {Observable} from 'rxjs';
import {Difficulte} from '../model/difficulte';
import {Etat} from '../model/etat';
import {Personne} from '../model/personne';
import {AuthService} from '../auth.service';
import {ActivatedRoute} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TableauDeBordHttpService {

  private coursSuivies: any;
  private coursTermines: any;
  private coursAdministres: any;
private idUtilisateur:number;
  private currentPersonne: Personne;

  private skeelzs:any;






  constructor(private http: HttpClient, private appConfigService: AppConfigService,public authService: AuthService,private route: ActivatedRoute) {

  }

  findByUtilisateur(id:number): Observable<any>{

      return this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + id);
  }



  loadCoursSuivie(id:number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/courss/SUIVI");
  }
  loadCoursTermine(id:number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/courss/VALIDE");
  }
  loadCoursCree(id:number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/courss/ADMINISTRE");
  }

  loadPersonneSkeelz(id:number) {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/skeelz").subscribe(resp =>
      this.skeelzs = resp);
  }

  findCompetenceSkeelzByIdPersonne(idPersonne: number){
    return this.http.get(this.appConfigService.backEnd + 'competenceSkeelz/personne/' + idPersonne);
  }

  // findAllCoursSuivie(): any {
  //   return this.coursSuivies;
  // }
  // findAllCoursTermine(): any {
  //   return this.coursTermines;
  // }
  // findAllCoursCreer(): any {
  //   return this.coursAdministres;
  // }
  // findAllPersonneSkeelz(): any {
  //   return this.skeelzs;
  // }


  findIntroCours(id:number, agencement0:number=0){

    return this.http.get(this.appConfigService.backEnd +"module/FindByIdCoursAndAgencement/"+ id +":"+agencement0);
  }


}
