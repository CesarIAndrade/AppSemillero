import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumChatPage } from './forum-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ForumChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumChatPageRoutingModule {}
