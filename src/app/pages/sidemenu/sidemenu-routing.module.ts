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
        path: "foros",
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
      {
        path: "sopa-de-letras",
        loadChildren: () =>
          import("../word-soup/word-soup.module").then(
            (m) => m.WordSoupPageModule
          ),
      },
      {
        path: "ahorcado",
        loadChildren: () =>
          import("../hanged/hanged.module").then((m) => m.HangedPageModule),
      },
      {
        path: "crucigrama",
        loadChildren: () =>
          import("../cross-word/cross-word.module").then(
            (m) => m.CrossWordPageModule
          ),
      },
      {
        path: "qqsm",
        loadChildren: () =>
          import("../wwtbm/wwtbm.module").then((m) => m.WwtbmPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule {}
