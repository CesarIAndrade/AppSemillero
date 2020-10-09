import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalScoresPageRoutingModule } from './modal-scores-routing.module';

import { ModalScoresPage } from './modal-scores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalScoresPageRoutingModule
  ],
  declarations: [ModalScoresPage]
})
export class ModalScoresPageModule {}
