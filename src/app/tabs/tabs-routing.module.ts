import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "estadisticas",
        loadChildren: () =>
          import("../pages/dash/dash.module").then((m) => m.DashPageModule),
      },
      {
        path: "juegos",
        loadChildren: () =>
          import("../pages/games/games.module").then((m) => m.GamesPageModule),
      },
      {
        path: "perfil",
        loadChildren: () =>
          import("../pages/profile/profile.module").then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/juegos",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/tabs/juegos",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
