import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { AvatarListComponent } from "./avatar-list/avatar-list.component";
import { SubjectListComponent } from "./subject-list/subject-list.component";
import { SpinnerComponent } from "./spinner/spinner.component";

import { RouterModule } from "@angular/router";

let myComponents = [
  HeaderComponent,
  AvatarListComponent,
  SubjectListComponent,
  SpinnerComponent,
];

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule],
  exports: [...myComponents],
})
export class ComponentsModule {}
