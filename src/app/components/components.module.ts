import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

import { RouterModule } from '@angular/router';

let myComponents = [MenuComponent, HeaderComponent]

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [...myComponents]
})
export class ComponentsModule { }
