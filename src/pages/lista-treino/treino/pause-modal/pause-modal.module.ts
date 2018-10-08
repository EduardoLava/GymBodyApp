import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PauseModalPage } from './pause-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PauseModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PauseModalPage),
    TranslateModule.forChild(),
  ],
})
export class PauseModalPageModule {}
