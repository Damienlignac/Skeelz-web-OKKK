import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours';
import {Router} from '@angular/router';
import {CreationCoursHttpService} from './creation-cours.http.service';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Etat} from '../model/etat';

@Component({
  selector: 'app-edition-cours',
  templateUrl: './creation-cours.component.html',
  styleUrls: ['./creation-cours.component.css']
})
export class CreationCoursComponent implements OnInit {

  idCours: number;
  cours: Cours = new Cours();


  constructor(private http: HttpClient,private router: Router, private creationCoursHttpService: CreationCoursHttpService,private appConfigService: AppConfigService) {
  }

  save(cours:Cours) {
    cours.etat =Etat.FERME
    this.http.post(this.appConfigService.backEnd + 'cours', cours).subscribe(resp => {
      this.idCours= resp.id;
      this.router.navigate(['/editionCours/' + this.idCours])
      console.log(this.idCours)
    })
  }



  ngOnInit() {

  }


}
