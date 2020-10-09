import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WwtbmPage } from './wwtbm.page';

const routes: Routes = [
  {
    path: '',
    component: WwtbmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WwtbmPageRoutingModule {}
