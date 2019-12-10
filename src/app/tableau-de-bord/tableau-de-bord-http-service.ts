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
  private courss: any;

  currentPersonne: Personne;

  private skeelzs:any;






  constructor(private http: HttpClient, private appConfigService: AppConfigService,public authService: AuthService,private route: ActivatedRoute) {
  //
  //   this.idUtilisateur = +localStorage.getItem('token');
  //   this.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
  //     this.currentPersonne = resp;
  //     this.route.params.subscribe(params => {
  //       this.currentPersonne.id = params['idPersonne'];
  //     });
  //
  //   this.loadCoursSuivie(this.currentPersonne.id);
  //   this.loadCoursTermine(this.currentPersonne.id);
  //   this.loadCoursCree(this.currentPersonne.id);
  //   this.loadPersonneSkeelz(this.currentPersonne.id);
  // });
  }

  findByUtilisateur(id:number): Observable<any>{

      return this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + id);
  }



  loadCoursSuivie(id:number) {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/courss/SUIVIE").subscribe(resp =>
      this.courss = resp);
  }
  loadCoursTermine(id:number) {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/courss/VALIDE").subscribe(resp =>
      this.courss = resp);
  }
  loadCoursCree(id:number) {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/courss/ADMINISTRE").subscribe(resp =>
      this.courss = resp);
  }

  loadPersonneSkeelz(id:number) {
    return this.http.get(this.appConfigService.backEnd + "personne/"+id+"/skeelz").subscribe(resp =>
      this.skeelzs = resp);
  }

  //
  // findAllCoursSuivie(): any {
  //   return this.courss;
  // }
  // findAllCoursTermine(): any {
  //   return this.courss;
  // }
  // findAllCoursCreer(): any {
  //   return this.courss;
  // }
  // findAllPersonneSkeelz(): any {
  //   return this.skeelzs;
  // }


  findIntroCours(id:number, agencement0:number=0){

    return this.http.get(this.appConfigService.backEnd +"module/FindByIdCoursAndAgencement/"+ id +":"+agencement0);
  }


}
