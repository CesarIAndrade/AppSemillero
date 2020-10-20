import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumChatPageRoutingModule } from './forum-chat-routing.module';

import { ForumChatPage } from './forum-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumChatPageRoutingModule
  ],
  declarations: [ForumChatPage]
})
export class ForumChatPageModule {}
