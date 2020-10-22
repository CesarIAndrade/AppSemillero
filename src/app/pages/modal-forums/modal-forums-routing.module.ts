import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalForumsPage } from './modal-forums.page';

const routes: Routes = [
  {
    path: '',
    component: ModalForumsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalForumsPageRoutingModule {}
