import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAvaliacaoFisicaPage } from './lista-avaliacao-fisica';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'ion2-calendar';


@NgModule({
  declarations: [
    ListaAvaliacaoFisicaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAvaliacaoFisicaPage),
    TranslateModule.forChild(),
    CalendarModule
  ],
})
export class ListaAvaliacaoFisicaPageModule {}
