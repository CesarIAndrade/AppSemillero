import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalStudentsPage } from './modal-students.page';

const routes: Routes = [
  {
    path: '',
    component: ModalStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalStudentsPageRoutingModule {}
