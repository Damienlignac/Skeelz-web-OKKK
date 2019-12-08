import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';
import {Utilisateur} from '../model/utilisateur';
import {CoursPersonne} from '../model/coursPersonne';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {
  private utilisateurs: any;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get(this.appConfigService.backEnd + "utilisateur").subscribe(resp =>
      this.utilisateurs = resp);
  }

  findAll(): any {
    return this.utilisateurs;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'utilisateur/' + id);
  }

  findByUtilisateur(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + id);
  }

  save(utilisateur: Utilisateur) {
    if (utilisateur.id) {
      this.http.put(this.appConfigService.backEnd + 'utilisateur/' + utilisateur.id, utilisateur).subscribe(resp => this.load());
    } else {
      this.http.post(this.appConfigService.backEnd + 'utilisateur/', utilisateur).subscribe(resp => this.load());
    }
  }

  createCoursPersonne(coursPersonne : CoursPersonne): Observable<any> {
    return this.http.post(this.appConfigService.backEnd + 'CoursPeronne', coursPersonne);
  }

  deleteBydId(id: number) {
    this.http.delete(this.appConfigService.backEnd + 'utilisateur/' + id).subscribe(resp => this.load());
  }
}

