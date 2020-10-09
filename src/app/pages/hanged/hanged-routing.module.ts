import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HangedPage } from './hanged.page';

const routes: Routes = [
  {
    path: '',
    component: HangedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HangedPageRoutingModule {}
