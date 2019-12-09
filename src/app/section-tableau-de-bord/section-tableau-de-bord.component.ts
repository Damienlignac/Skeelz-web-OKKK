import { Component, OnInit } from '@angular/core';
import {TableauDeBordHttpService} from '../tableau-de-bord/tableau-de-bord-http-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Personne} from '../model/personne';
import {Skeelz} from '../model/skeelz';

@Component({
  selector: 'section-tableau-de-bord',
  templateUrl: './section-tableau-de-bord.component.html',
  styleUrls: ['./section-tableau-de-bord.component.css']
})
export class SectionTableauDeBordComponent implements OnInit {
  idUtilisateur: number;
  currentPersonne: Personne;

  skeelzs:any;


  constructor(private tableauDeBordHttpService: TableauDeBordHttpService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.tableauDeBordHttpService.findByUtilisateur(this.idUtilisateur).subscribe(resp => {
      this.currentPersonne = resp;
      this.route.params.subscribe(params => {
        this.currentPersonne.id = params['idPersonne'];
      });
      this.listSkeelz();
    });
  }

  ngOnInit() {
  }

  listSkeelz(){
    this.skeelzs = this.tableauDeBordHttpService.loadPersonneSkeelz(this.currentPersonne.id);
    return this.skeelzs;
  }


}
}
