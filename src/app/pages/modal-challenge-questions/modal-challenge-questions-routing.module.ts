import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalChallengeQuestionsPage } from './modal-challenge-questions.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChallengeQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalChallengeQuestionsPageRoutingModule {}
