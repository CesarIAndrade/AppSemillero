import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalWwtbmPage } from './modal-wwtbm.page';

const routes: Routes = [
  {
    path: '',
    component: ModalWwtbmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalWwtbmPageRoutingModule {}
