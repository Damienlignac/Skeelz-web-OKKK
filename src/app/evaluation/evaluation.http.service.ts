import {Injectable} from '@angular/core';
import {Evaluation} from '../model/evaluation';
import {AppConfigService} from '../app-config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationHttpService {
  private evaluations: any;
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.load();
  }
  load() {
    this.http.get(this.appConfigService.backEnd + 'evaluation')
      .subscribe(resp => this.evaluations = resp);
  }
  public findAll(): any {
    return this.evaluations;
  }
  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd + 'evaluation/' + id);
  }
  save(evaluation: Evaluation) {
    if (evaluation.id) {
      this.http.put(this.appConfigService.backEnd + 'evaluation/' + evaluation.id, evaluation).subscribe(resp => this.load());
    } else {


      this.http.post(this.appConfigService.backEnd + 'evaluation/', evaluation).subscribe(resp => this.load());
    }
  }
  deleteBydId(id: number) {
    this.http.delete(this.appConfigService.backEnd + 'evaluation/' + id).subscribe(resp => this.load());
  }
}




