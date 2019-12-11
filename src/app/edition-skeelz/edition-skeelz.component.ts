import { Component, OnInit } from '@angular/core';
import {EditionSkeelzService} from './edition-skeelz.service';
import {Skeelz} from '../model/skeelz';
import {Competence} from '../model/competence';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Etat} from '../model/etat';
import {CompetenceSkeelz} from '../model/competenceSkeelz';

@Component({
  selector: 'app-edition-skeelz',
  templateUrl: './edition-skeelz.component.html',
  styleUrls: ['./edition-skeelz.component.css']
})
export class EditionSkeelzComponent implements OnInit {

  newskeelz: Skeelz = new Skeelz();
  newcomp: Competence = new Competence();
  listskeelz: Array<Skeelz>;
  compSkeelz: CompetenceSkeelz = new CompetenceSkeelz();

  constructor(private editionSkeelzService: EditionSkeelzService, private http: HttpClient, private appConfigService: AppConfigService) {

  }

  ngOnInit() {
  }

  saveskeelz() {
    console.log(this.newskeelz);
    this.http.post(this.appConfigService.backEnd + 'skeelz', this.newskeelz).subscribe(resp => {
      this.editionSkeelzService.load();
      this.newskeelz.intitule = '';
    });


  }

  save() {
    console.log(this.newcomp);
    this.http.post(this.appConfigService.backEnd + 'competence', this.newcomp).subscribe(resp => {
      this.newcomp = <Competence> resp;
      console.log(this.newcomp);
      this.chargeskeelzs();
      this.editionSkeelzService.load2();
      this.editionSkeelzService.load3();
      alert("Une nouvelle compétence a été créée.");
      for (let skeelz of this.listskeelz) {
        console.log(this.listskeelz);
        if (skeelz.choisi == true) {
          this.compSkeelz.competence = this.newcomp;
          this.compSkeelz.skeelz = skeelz;
          console.log(this.compSkeelz);
          this.http.post(this.appConfigService.backEnd + 'competenceSkeelz', this.compSkeelz).subscribe(resp => {
            this.compSkeelz = <CompetenceSkeelz> resp;
            this.reset();
          });
        }
      }
    })
  }


  chargeskeelzs() {
    this.listskeelz = this.editionSkeelzService.findAllSkeelz();
    return this.listskeelz;
  }


  reset() {
    this.newcomp.intitule = null;
    this.newcomp.ponderation = null;
    this.newcomp.description = null;
    this.newskeelz.intitule = '';
    for(let ske of this.chargeskeelzs()){
      ske.choisi = false;
    }
    return;
  }

  savecompskeelz(choisi: boolean) {
    this.editionSkeelzService.load();
    this.editionSkeelzService.load2();
    this.editionSkeelzService.load3();
    for (let ske of this.editionSkeelzService.findAllSkeelz()){
      if (ske.choisi == true){
        this.compSkeelz.competence = this.newcomp;
        this.compSkeelz.skeelz = this.newskeelz;
        this.http.post(this.appConfigService.backEnd + 'competenceSkeelz', this.compSkeelz).subscribe(resp=>{
          this.newcomp.intitule = null;
          this.newcomp.ponderation = null;
          this.newcomp.description = null;
          alert("Une nouvelle compétence a été créée.");
          return ske.choisi == false;
        });
      }
    }
  }
}

