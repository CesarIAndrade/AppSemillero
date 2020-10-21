import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ForumsService } from "src/app/services/forums.service";
import { ScoresService } from "src/app/services/scores.service";
import { TeacherService } from 'src/app/services/teacher.service';
import { ForumChatPage } from "../forum-chat/forum-chat.page";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.page.html",
  styleUrls: ["./forum.page.scss"],
})
export class ForumPage implements OnInit {
  constructor(
    private forumsSvc: ForumsService,
    private alertController: AlertController,
    private modalController: ModalController,
    private scoresSvc: ScoresService,
    private teacherSvc: TeacherService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user.idTipo == 1) {
      this.getTeacherSchedule(this.user.cedula);
    } else {
      this.getCurrentSubjects(this.user.cedula);
    }
  }

  forums: any[] = [];
  user: any;
  subjects: any[] = [];
  selectedSubject = false;

  async createForum(subject) {
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
            this.forumsSvc.createForum(
              alertData.topic,
              alertData.subTopic,
              alertData.limitDate,
              this.user.idRegistro,
              subject
            )
            .then((res) => console.log(res))
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
        forumId: forum.idForo,
      },
    });
    return await modal.present();
  }

  getCurrentSubjects(document) {
    this.scoresSvc
      .getCurrentSubjects(document)
      .then((res: any) => {
        console.log(res);
        var subjects = []
        res.map((item) => {
          subjects.push({
            id: item.DISTRO,
            name: item.MATERIA
          })
        })
        this.subjects = subjects;
      })
      .catch((err) => console.log(err));
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
        this.selectedSubject = true;
      })
      .catch((err) => console.log(err));
  }

  getTeacherSchedule(document) {
    this.teacherSvc.getTeacherSchedule(document)
    .then((res: any) =>{
      console.log(res);
      var subjects = []
      res.map((item) => {
        subjects.push({
          id: item.DistribucionId,
          name: item.Nombre
        })
      })
      this.subjects = subjects;
    }).catch((err) => console.log(err));
  }

  async presentAlertConfirm(subject) {
    console.log(subject);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.createForum(subject);
          }
        }
      ]
    });
    await alert.present();
  }

  handleClick(subject) {
    if(this.user.idTipo == 1) {
      this.presentAlertConfirm(subject);
    } else {
      this.getSubjectForums(subject);
    }
  }
}
