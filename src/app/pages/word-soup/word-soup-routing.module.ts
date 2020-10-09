import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordSoupPage } from './word-soup.page';

const routes: Routes = [
  {
    path: '',
    component: WordSoupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordSoupPageRoutingModule {}
