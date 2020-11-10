import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalChallengeQuestionPage } from './modal-challenge-question.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChallengeQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalChallengeQuestionPageRoutingModule {}
