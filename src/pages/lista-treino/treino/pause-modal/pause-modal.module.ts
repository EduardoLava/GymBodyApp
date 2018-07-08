import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PauseModalPage } from './pause-modal';

@NgModule({
  declarations: [
    PauseModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PauseModalPage),
  ],
})
export class PauseModalPageModule {}
