import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaSelecionarPessoaPage } from './avaliacao-fisica-selecionar-pessoa';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaSelecionarPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaSelecionarPessoaPage),
    TranslateModule.forChild()
  ],
})
export class AvaliacaoFisicaSelecionarPessoaPageModule {}
