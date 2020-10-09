import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrossWordPage } from './cross-word.page';

const routes: Routes = [
  {
    path: '',
    component: CrossWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrossWordPageRoutingModule {}
