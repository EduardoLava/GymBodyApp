import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercicioRealizadoDetalhesPage } from './exercicio-realizado-detalhes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ExercicioRealizadoDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExercicioRealizadoDetalhesPage),
    TranslateModule.forChild()
  ],
})
export class ExercicioRealizadoDetalhesPageModule {}
