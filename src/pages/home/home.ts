import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PessoaServiceProvider } from '../../providers/services/pessoa-service/pessoa-service';
import { Pessoa } from '../../model/entities';
import { LoginServiceProvider } from '../../providers/services/login-service/login-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public loginService: LoginServiceProvider
  ) {

  }

  fazer(){
    this.loginService.logout();
  }

  verificar(){
    this.loginService.verificaLogin();
  }


}
