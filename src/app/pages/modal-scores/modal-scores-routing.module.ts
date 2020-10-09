import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalScoresPage } from './modal-scores.page';

const routes: Routes = [
  {
    path: '',
    component: ModalScoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalScoresPageRoutingModule {}
