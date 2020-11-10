import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalWwtbmPageRoutingModule } from './modal-wwtbm-routing.module';

import { ModalWwtbmPage } from './modal-wwtbm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalWwtbmPageRoutingModule
  ],
  declarations: [ModalWwtbmPage]
})
export class ModalWwtbmPageModule {}
