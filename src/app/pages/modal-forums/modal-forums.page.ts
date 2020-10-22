import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ForumsService } from "src/app/services/forums.service";
import { ForumChatPage } from "../forum-chat/forum-chat.page";

@Component({
  selector: "app-modal-forums",
  templateUrl: "./modal-forums.page.html",
  styleUrls: ["./modal-forums.page.scss"],
})
export class ModalForumsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private forumsSvc: ForumsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getSubjectForums(this.subject.id);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.forumsSvc.refresh$.subscribe(() => {
      this.getSubjectForums(this.subject.id);
    })
  }

  @Input() subject: any;
  forums: any[] = [];
  user: any;

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  getSubjectForums(subject) {
    this.forumsSvc
      .getSubjectForums(subject)
      .then((res: any) => {
        console.log(res);
        res.map((item) => {
          if (item.Likes == 1) {
            item.like_dislike_color = "color: #3880ff";
          }
        });
        this.forums = res;
      })
      .catch((err) => console.log(err));
  }

  async createForum() {
    var date = new Date().toJSON().split("T")[0];
    const alert = await this.alertController.create({
      header: "Crear foro",
      inputs: [
        {
          name: "topic",
          type: "text",
          placeholder: "Tema",
        },
        {
          name: "subTopic",
          type: "text",
          placeholder: "SubTema",
        },
        {
          name: "limitDate",
          type: "date",
          min: date,
          value: date,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Guardar",
          handler: (alertData) => {
            this.forumsSvc
              .createForum(
                alertData.topic,
                alertData.subTopic,
                alertData.limitDate,
                this.user.idRegistro,
                this.subject.id
              )
              .then(() => this.getSubjectForums(this.subject.id))
              .catch((err) => console.log(err));
          },
        },
      ],
    });
    await alert.present();
  }

  like(forum) {
    this.forumsSvc
      .like(forum.idForo, this.user.idRegistro)
      .then(() => {
        forum.like_dislike_color = "color: #3880ff";
        forum.nLikes += 1;
        forum.Likes = 1;
      })
      .catch((err) => console.log(err));
  }

  dislike(forum) {
    this.forumsSvc
      .dislike(forum.idForo, this.user.idRegistro)
      .then(() => {
        forum.like_dislike_color = "";
        forum.nLikes -= 1;
        forum.Likes = 0;
      })
      .catch((err) => console.log(err));
  }

  validateLike(forum) {
    if (forum.Likes == 1) {
      this.dislike(forum);
    } else {
      this.like(forum);
    }
  }

  async openForum(forum) {
    const modal = await this.modalController.create({
      component: ForumChatPage,
      componentProps: {
        topic: forum.tema,
        subTopic: forum.subtema,
        forumId: forum.idForo,
      },
    });
    return await modal.present();
  }
}
