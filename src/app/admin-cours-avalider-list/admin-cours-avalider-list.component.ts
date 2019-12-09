import { Component, OnInit } from '@angular/core';
import {AdminCoursAValiderListService} from './admin-cours-avalider-list.service';


@Component({
  selector: 'app-admin-cours-avalider-list',
  templateUrl: './admin-cours-avalider-list.component.html',
  styleUrls: ['./admin-cours-avalider-list.component.css']
})
export class AdminCoursAValiderListComponent implements OnInit {

  listedecours: any;

  constructor(private coursAValiderListService: AdminCoursAValiderListService) {
  this.listattente();
  }

  ngOnInit() {}

  listattente(){
  return  this.listedecours = this.coursAValiderListService.findAllEnAttente();
    console.log(this.listedecours);
  }

}
