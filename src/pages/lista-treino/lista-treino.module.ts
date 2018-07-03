import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTreinoPage } from './lista-treino';

@NgModule({
  declarations: [
    ListaTreinoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTreinoPage),
  ],
})
export class ListaTreinoPageModule {}
