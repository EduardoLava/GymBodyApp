import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PessoaServiceProvider } from '../../providers/services/pessoa-service/pessoa-service';
import { Pessoa } from '../../model/pessoa/pessoa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    private pessoaService: PessoaServiceProvider,
    private alert: AlertController
  ) {
  }

  fazer(){
    
    this.pessoaService.login().subscribe(
      (pessoa:Pessoa) => {

        this.alert.create({
            buttons: ['OK'],
            title: 'OK',
            subTitle: ''+pessoa.email
          }).present();

        console.log('logado ok'+pessoa)
      },
      () => {
        this.alert.create({
          buttons: ['OK'],
          title: 'OK',
          subTitle: 'Erro'
        }).present();
       console.log('Deu erro');
      }
    );
  }

}
