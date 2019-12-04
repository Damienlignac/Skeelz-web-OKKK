import {Component, OnInit} from '@angular/core';
import {Evaluation} from '../model/evaluation';
import {EvaluationHttpService} from './evaluation.http.service';

@Component({
  selector: 'evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluation: Evaluation = null;

  constructor(private evaluationService: EvaluationHttpService) {
  }

  ngOnInit() {
  }

  public list(): any {
    return this.evaluationService.findAll();
  }

  add() {
    this.evaluation = new Evaluation();
  }

  edit(id: number) {
    this.evaluationService.findById(id).subscribe(resp => this.evaluation = resp);
  }

  save() {
    this.evaluationService.save(this.evaluation);
    this.cancel();
  }

  delete(id: number) {
    this.evaluationService.deleteBydId(id);
  }

  cancel() {
    this.evaluation = null;
  }
}
