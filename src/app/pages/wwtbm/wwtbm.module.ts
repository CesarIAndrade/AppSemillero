import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WwtbmPageRoutingModule } from './wwtbm-routing.module';

import { WwtbmPage } from './wwtbm.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WwtbmPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WwtbmPage]
})
export class WwtbmPageModule {}
