import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaListaPage } from './agenda-lista';

@NgModule({
  declarations: [
    AgendaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaListaPage),
  ],
})
export class AgendaListaPageModule {}
