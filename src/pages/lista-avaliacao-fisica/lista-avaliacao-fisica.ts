import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AvaliacaoFisicaSelecionarPessoaPage } from './avaliacao-fisica-selecionar-pessoa/avaliacao-fisica-selecionar-pessoa';
import { AvaliacaoFisicaServiceProvider } from '../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider
  ) {
  }

  ionViewDidLoad() {
  }


  novaAvaliacaoFisica(protocoloSelecionado: string) {

    let avaliacaoFisica = this.avaliacaoFisicaService
      .criaAvaliacaoFisica(protocoloSelecionado);

      console.log(avaliacaoFisica);
    this.navCtrl.push(AvaliacaoFisicaSelecionarPessoaPage.name, { 
      avaliacaoFisica: avaliacaoFisica
    });
  }

}
