import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreinoPage } from './treino';
import { TranslateModule } from '@ngx-translate/core';
import { TimerComponent } from '../../../components/timer/timer';

@NgModule({
  declarations: [
    TreinoPage,
    TimerComponent
  ],
  imports: [
    IonicPageModule.forChild(TreinoPage),
    TranslateModule.forChild(),
  ],
})
export class TreinoPageModule {}
