import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMultiusePage } from './modal-multiuse.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMultiusePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMultiusePageRoutingModule {}
