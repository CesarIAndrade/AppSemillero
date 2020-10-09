import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordSoupPageRoutingModule } from './word-soup-routing.module';

import { WordSoupPage } from './word-soup.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordSoupPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WordSoupPage]
})
export class WordSoupPageModule {}
