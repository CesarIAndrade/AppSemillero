import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalChallengeQuestionsPageRoutingModule } from './modal-challenge-questions-routing.module';

import { ModalChallengeQuestionsPage } from './modal-challenge-questions.page';

import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChallengeQuestionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModalChallengeQuestionsPage]
})
export class ModalChallengeQuestionsPageModule {}
