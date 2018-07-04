import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTreinoPage } from './lista-treino';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListaTreinoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTreinoPage),
    TranslateModule.forChild()
  ],
})
export class ListaTreinoPageModule {}
