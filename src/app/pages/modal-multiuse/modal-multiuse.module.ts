import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMultiusePageRoutingModule } from './modal-multiuse-routing.module';

import { ModalMultiusePage } from './modal-multiuse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMultiusePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalMultiusePage]
})
export class ModalMultiusePageModule {}
