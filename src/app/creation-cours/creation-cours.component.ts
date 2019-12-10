import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours';
import {Router} from '@angular/router';
import {CreationCoursHttpService} from './creation-cours.http.service';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Etat} from '../model/etat';
import {Personne} from '../model/personne';
import {CoursPersonne} from '../model/coursPersonne';
import {EtatCours} from '../model/etatCours';

@Component({
  selector: 'app-edition-cours',
  templateUrl: './creation-cours.component.html',
  styleUrls: ['./creation-cours.component.css'],

})
export class CreationCoursComponent implements OnInit {

  idCours: number;
  cours: Cours = new Cours();
  idUtilisateur: number;
  currentPersonne: Personne;
  coursPersonne: CoursPersonne= new CoursPersonne();


  constructor(private http: HttpClient,private router: Router, private creationCoursHttpService: CreationCoursHttpService,private appConfigService: AppConfigService) {
  }

  save(cours:Cours) {
    cours.etat =Etat.FERME
    this.http.post(this.appConfigService.backEnd + 'cours', cours).subscribe(resp => {
      this.cours= <Cours> resp;
      console.log(this.cours)
      this.idUtilisateur = +localStorage.getItem('token');
      this.creationCoursHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
        console.log(resp)
        console.log(this.cours);
        this.currentPersonne = resp;
        console.log(this.currentPersonne)
        this.coursPersonne.cours=this.cours;
        this.coursPersonne.personne=this.currentPersonne;
        this.coursPersonne.etatCours=EtatCours.ADMINISTRE;
        this.http.post(this.appConfigService.backEnd+ 'CoursPersonne',this.coursPersonne).subscribe(resp=>this.router.navigate(['/editionCours/' + this.cours.id]));

    })
  })

  }


  ngOnInit() {

  }


}
