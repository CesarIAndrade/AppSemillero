import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalForumsPageRoutingModule } from './modal-forums-routing.module';

import { ModalForumsPage } from './modal-forums.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalForumsPageRoutingModule
  ],
  declarations: [ModalForumsPage]
})
export class ModalForumsPageModule {}
