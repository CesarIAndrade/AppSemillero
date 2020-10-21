import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "sidemenu",
    loadChildren: () =>
      import("./pages/sidemenu/sidemenu.module").then(
        (m) => m.SidemenuPageModule
      ),
  },
  {
    path: "modal-scores",
    loadChildren: () =>
      import("./pages/modal-scores/modal-scores.module").then(
        (m) => m.ModalScoresPageModule
      ),
  },
  {
    path: "forum-chat",
    loadChildren: () =>
      import("./pages/forum-chat/forum-chat.module").then(
        (m) => m.ForumChatPageModule
      ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
