import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Observable} from 'rxjs';
import {Personne} from '../model/personne';

@Injectable({
  providedIn: 'root'
})
export class AdminUserListHttpService {
  private personnes: any;
  private competences: any;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load()
    this.load3()
  }

  load() {
    this.http.get(this.appConfigService.backEnd + 'personne').subscribe(resp => {
      this.personnes = resp;

    });
  }

  load3() {
    this.http.get(this.appConfigService.backEnd + "competence").subscribe(resp =>
      this.competences = resp);
  }

  findAll(): any {
    return this.personnes;
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'personne/' + id);
  }

  findAllCompetences(): any{
    return this.competences;
  }


  save(personne: Personne) {
    if (personne.id) {
      this.http.put(this.appConfigService.backEnd + 'personne/' + personne.id, personne).subscribe(resp => this.load());
    } else {
      this.http.post(this.appConfigService.backEnd + 'personne/', personne).subscribe(resp => this.load());
    }
  }

  deleteBydId(id: number) {
    this.http.delete(this.appConfigService.backEnd + 'personne/' + id).subscribe(resp => this.load());
  }
}

