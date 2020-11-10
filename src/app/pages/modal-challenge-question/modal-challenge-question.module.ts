import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalChallengeQuestionPageRoutingModule } from './modal-challenge-question-routing.module';

import { ModalChallengeQuestionPage } from './modal-challenge-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChallengeQuestionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalChallengeQuestionPage]
})
export class ModalMultiusePageModule {}
