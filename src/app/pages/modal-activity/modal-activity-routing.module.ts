import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalActivityPage } from './modal-activity.page';

const routes: Routes = [
  {
    path: '',
    component: ModalActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalActivityPageRoutingModule {}
