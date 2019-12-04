import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Stagiaire} from '../model/stagiaire';
import {StagiaireService} from '../stagiaire/stagiaire.service';
import {StagiaireHttpService} from '../stagiaire/stagiaire.http.service';
import {Adresse} from '../model/adresse';

@Component({
  selector: 'stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.css']
})
export class StagiaireFormComponent implements OnInit {
  @Input("current")
  stagiaire: Stagiaire;
  adresse: Adresse;

  @Output()
  childEvent = new EventEmitter();

  save() {

    this.stagiaireService.save(this.stagiaire);
    this.cancel();
  }

  cancel(){
    this.childEvent.emit();
  }

  constructor(private stagiaireService: StagiaireHttpService) { }

  ngOnInit() {
  }



}
