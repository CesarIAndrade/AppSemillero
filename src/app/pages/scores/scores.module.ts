import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoresPageRoutingModule } from './scores-routing.module';

import { ScoresPage } from './scores.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ScoresPage]
})
export class ScoresPageModule {}
