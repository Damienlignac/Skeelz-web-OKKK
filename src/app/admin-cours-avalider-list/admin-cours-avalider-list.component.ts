import { Component, OnInit } from '@angular/core';
import {AdminCoursAValiderListService} from './admin-cours-avalider-list.service';
import {Cours} from '../model/cours';


@Component({
  selector: 'app-admin-cours-avalider-list',
  templateUrl: './admin-cours-avalider-list.component.html',
  styleUrls: ['./admin-cours-avalider-list.component.css']
})
export class AdminCoursAValiderListComponent implements OnInit {


  constructor(private coursAValiderListService: AdminCoursAValiderListService) {

  }

  ngOnInit() {
  }

  list() {

      return this.coursAValiderListService.findAll();

  }


}
