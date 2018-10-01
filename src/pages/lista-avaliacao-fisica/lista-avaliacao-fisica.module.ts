import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAvaliacaoFisicaPage } from './lista-avaliacao-fisica';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ListaAvaliacaoFisicaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAvaliacaoFisicaPage),
    TranslateModule.forChild(),
  ],
})
export class ListaAvaliacaoFisicaPageModule {}
