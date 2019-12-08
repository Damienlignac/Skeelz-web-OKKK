import {Component, OnInit} from '@angular/core';
import {Login} from '../model/login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LoginHttpService} from './login-http.service';
import {Utilisateur} from '../model/utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  listUtilisateur: Array<Utilisateur>;

  constructor(private route: ActivatedRoute, private loginHttpService: LoginHttpService, private formBuilder: FormBuilder, private router: Router, public authService: AuthService) {

    this.loginHttpService.findAll().subscribe(resp => this.listUtilisateur = resp);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/cours';
    this.authService.logout();
  }

  get f() {
    return this.loginForm.controls;
  }


  login() {


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.listUtilisateur.find(user => user.identifiant == this.f.identifiant.value && user.password == this.f.password.value)) {
        console.log('Login successful');
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.f.identifiant.value);
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = 'Please check your userid and password';
      }
    }
  }

}

