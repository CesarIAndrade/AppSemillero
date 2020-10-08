import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SidemenuPage } from "./sidemenu.page";

const routes: Routes = [
  {
    path: "",
    component: SidemenuPage,
    children: [
      {
        path: "actividades",
        loadChildren: () =>
          import("../activities/activities.module").then(
            (m) => m.ActivitiesPageModule
          ),
      },
      {
        path: "foro",
        loadChildren: () =>
          import("../forum/forum.module").then((m) => m.ForumPageModule),
      },
      {
        path: "notas",
        loadChildren: () =>
          import("../scores/scores.module").then((m) => m.ScoresPageModule),
      },
      {
        path: "estadisticas",
        loadChildren: () =>
          import("../dash/dash.module").then((m) => m.DashPageModule),
      },
      {
        path: "juegos",
        loadChildren: () =>
          import("../games/games.module").then((m) => m.GamesPageModule),
      },
      {
        path: "perfil",
        loadChildren: () =>
          import("../profile/profile.module").then((m) => m.ProfilePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule {}
