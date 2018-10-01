import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AvaliacaoFisicaSelecionarPessoaPage } from './avaliacao-fisica-selecionar-pessoa/avaliacao-fisica-selecionar-pessoa';

/**
 * Generated class for the ListaAvaliacaoFisicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-avaliacao-fisica',
  templateUrl: 'lista-avaliacao-fisica.html',
})
export class ListaAvaliacaoFisicaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }


  novaAvaliacaoFisica(protocoloSelecionado: string) {
    console.log(protocoloSelecionado);
    this.navCtrl.push(AvaliacaoFisicaSelecionarPessoaPage.name, { 
      protocolo: protocoloSelecionado
    });
  }

}
