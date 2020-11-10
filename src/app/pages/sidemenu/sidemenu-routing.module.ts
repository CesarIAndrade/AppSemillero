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
        path: "ahorcado",
        loadChildren: () =>
          import("../hanged/hanged.module").then((m) => m.HangedPageModule),
      },
      {
        path: "qqsm",
        loadChildren: () =>
          import("../wwtbm/wwtbm.module").then((m) => m.WwtbmPageModule),
      },
      {
        path: "modal-scores",
        loadChildren: () =>
          import("../modal-scores/modal-scores.module").then(
            (m) => m.ModalScoresPageModule
          ),
      },
      {
        path: "forum-chat",
        loadChildren: () =>
          import("../forum-chat/forum-chat.module").then(
            (m) => m.ForumChatPageModule
          ),
      },
      {
        path: "modal-activity",
        loadChildren: () =>
          import("../modal-activity/modal-activity.module").then(
            (m) => m.ModalActivityPageModule
          ),
      },
      {
        path: "modal-forums",
        loadChildren: () =>
          import("../modal-forums/modal-forums.module").then(
            (m) => m.ModalForumsPageModule
          ),
      },
      {
        path: "modal-students",
        loadChildren: () =>
          import("../modal-students/modal-students.module").then(
            (m) => m.ModalStudentsPageModule
          ),
      },
      {
        path: "modal-challenge-questions",
        loadChildren: () =>
          import(
            "../modal-challenge-questions/modal-challenge-questions.module"
          ).then((m) => m.ModalChallengeQuestionsPageModule),
      },
      {
        path: "modal-wwtbm",
        loadChildren: () =>
          import("../modal-wwtbm/modal-wwtbm.module").then(
            (m) => m.ModalWwtbmPageModule
          ),
      },
      {
        path: "modal-challenge-question",
        loadChildren: () =>
          import(
            "../modal-challenge-question/modal-challenge-question.module"
          ).then((m) => m.ModalMultiusePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule {}
