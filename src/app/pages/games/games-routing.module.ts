import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GamesPage } from "./games.page";

const routes: Routes = [
  {
    path: "",
    component: GamesPage,
    children: [

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesPageRoutingModule {}
