import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalChallengeQuestionsPageRoutingModule } from './modal-challenge-questions-routing.module';

import { ModalChallengeQuestionsPage } from './modal-challenge-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChallengeQuestionsPageRoutingModule
  ],
  declarations: [ModalChallengeQuestionsPage]
})
export class ModalChallengeQuestionsPageModule {}
