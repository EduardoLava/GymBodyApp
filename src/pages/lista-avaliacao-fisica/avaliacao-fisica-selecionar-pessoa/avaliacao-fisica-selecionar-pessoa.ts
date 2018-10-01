import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Pessoa, Page } from '../../../model/entities';

import { PessoaServiceProvider } from '../../../providers/services/pessoa-service/pessoa-service';

/**
 * Generated class for the AvaliacaoFisicaSelecionarPessoaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao-fisica-selecionar-pessoa',
  templateUrl: 'avaliacao-fisica-selecionar-pessoa.html',
})
export class AvaliacaoFisicaSelecionarPessoaPage {

  private pessoas: Pessoa[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pessoaService: PessoaServiceProvider
  ) {
    this.pessoas = [];
  }

  ionViewDidLoad() {
    this.listByFilters(' ');
  }

  /**
   * Lista pessoas de acordo com o filtro
   * @param event 
   */
  listByFilters(filtro: string){

    console.log(filtro);

    if(filtro == null || '' == filtro){
      filtro = ' ';
    }

    this.pessoaService.listPessoasByFilters(filtro).subscribe((pessoas: Page<Pessoa>)=>{
      this.pessoas = [];
      if(pessoas) {
        this.pessoas = pessoas.content;
      }
    });
    
  }

}
