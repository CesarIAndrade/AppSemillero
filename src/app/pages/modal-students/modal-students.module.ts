import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalStudentsPageRoutingModule } from './modal-students-routing.module';

import { ModalStudentsPage } from './modal-students.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalStudentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModalStudentsPage]
})
export class ModalStudentsPageModule {}
