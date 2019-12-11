import { Component, OnInit } from '@angular/core';
import {Personne} from '../model/personne';
import {Observable} from 'rxjs';
import {Utilisateur} from '../model/utilisateur';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AppConfigService} from '../app-config.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ecran-admin',
  templateUrl: './ecran-admin.component.html',
  styleUrls: ['./ecran-admin.component.css']
})
export class EcranAdminComponent implements OnInit {
  private currentPersonne: Personne;
  private idUtilisateur: number;
  constructor(private http: HttpClient, private appConfigService: AppConfigService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.idUtilisateur = +localStorage.getItem('token');
    this.http.get(this.appConfigService.backEnd + 'personne/utilisateur/' + this.idUtilisateur).subscribe(resp=> this.currentPersonne=<Personne> resp);
  }

  ngOnInit() {
  }

}
