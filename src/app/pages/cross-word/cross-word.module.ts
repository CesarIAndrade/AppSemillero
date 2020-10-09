import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrossWordPageRoutingModule } from './cross-word-routing.module';

import { CrossWordPage } from './cross-word.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrossWordPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrossWordPage]
})
export class CrossWordPageModule {}
