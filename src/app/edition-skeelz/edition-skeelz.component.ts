import { Component, OnInit } from '@angular/core';
import {EditionSkeelzService} from './edition-skeelz.service';
import {Skeelz} from '../model/skeelz';
import {Competence} from '../model/competence';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Etat} from '../model/etat';

@Component({
  selector: 'app-edition-skeelz',
  templateUrl: './edition-skeelz.component.html',
  styleUrls: ['./edition-skeelz.component.css']
})
export class EditionSkeelzComponent implements OnInit {

  newskeelz: Skeelz = new Skeelz();
  newcomp: Competence = new Competence();
  listskeelz: Array<Skeelz>;
  modecreate = false;

  constructor(private editionSkeelzService: EditionSkeelzService, private http: HttpClient, private appConfigService: AppConfigService) {

  }

  ngOnInit() {
  }
  saveskeelz(){
    console.log(this.newskeelz);
    this.http.post(this.appConfigService.backEnd + 'skeelz', this.newskeelz).subscribe(resp=> {
      this.editionSkeelzService.load();
    });


  }
  save(){
    console.log(this.newcomp);
    this.http.post(this.appConfigService.backEnd + 'competence', this.newcomp).subscribe();
    this.newcomp.intitule = null;
    this.newcomp.ponderation = null;
    this.newcomp.description = null;
    alert("Une nouvelle compétence a été créée.");
    return;

  }
  chargeskeelzs(){
    this.listskeelz = this.editionSkeelzService.findAllSkeelz();
    return this.listskeelz;
  }
  setboolean(){
    this.modecreate = true;
  }

}
