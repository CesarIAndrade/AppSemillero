import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ForumsService } from "src/app/services/forums.service";
import { ForumChatPage } from '../forum-chat/forum-chat.page';

@Component({
  selector: "app-forum",
  templateUrl: "./forum.page.html",
  styleUrls: ["./forum.page.scss"],
})
export class ForumPage implements OnInit {
  constructor(
    private forumsSvc: ForumsService,
    private alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getForums(this.user.idRegistro);
  }

  forums: any[] = [];
  user: any;

  getForums(id) {
    this.forumsSvc
      .getForums(id)
      .then((res: any) => {
        res.map((item) => {
          if (item.Likes == 1) {
            item.like_dislike_color = "color: #3880ff";
          }
        });
        this.forums = res;
      })
      .catch((err) => console.log(err));
  }

  createForum() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    var date = new Date().toJSON().split("T")[0];
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Prompt!",
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
                this.user.idRegistro
              )
              .then((res) => this.getForums(this.user.idRegistro))
              .catch((err) => console.log(err));
          },
        },
      ],
    });
    await alert.present();
  }

  validateLike(forum) {
    if (forum.Likes == 1) {
      this.dislike(forum);
    } else {
      this.like(forum);
    }
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

  async openForum(forum) {
    const modal = await this.modalController.create({
      component: ForumChatPage,
      componentProps: {
        topic: forum.tema,
        subTopic: forum.subtema,
        forumId: forum.idForo
      },
    });
    return await modal.present();
  }
}
