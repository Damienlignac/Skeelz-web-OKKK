import { Component, OnInit } from '@angular/core';
import {UtilisateurHttpService} from './utilisateur-http.service';
import {Utilisateur} from '../model/utilisateur';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  utilisateur: Utilisateur = null;

  constructor(private utilisateurService: UtilisateurHttpService) {
  }


  ngOnInit() {
  }

  list():any {
    return this.utilisateurService.findAll();
  }

  add() {
    this.utilisateur = new Utilisateur()
  }

  edit(id: number) {
    this.utilisateurService.findById(id).subscribe(resp => this.utilisateur = resp);

  }

  delete(id: number) {
    this.utilisateurService.deleteBydId(id);
  }

  cancel() {
    this.utilisateur = null;
  }

}
