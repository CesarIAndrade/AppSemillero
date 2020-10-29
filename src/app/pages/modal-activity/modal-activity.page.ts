import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { SubjectService } from "src/app/services/subject.service";
import { ModalStudentsPage } from "../modal-students/modal-students.page";

@Component({
  selector: "app-modal-activity",
  templateUrl: "./modal-activity.page.html",
  styleUrls: ["./modal-activity.page.scss"],
})
export class ModalActivityPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private subjectSvc: SubjectService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getSubjectChallenges();
    this.subjectSvc.refresh$.subscribe(() => {
      this.getSubjectChallenges();
    });
  }

  @Input() subject: any;
  @Input() activity: string;
  user: any;
  challenges: any[] = [];
  gettingData = true;

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  async createChallenge() {
    var date = new Date().toJSON().split("T")[0];
    const alert = await this.alertController.create({
      header: "Crear reto",
      inputs: [
        {
          name: "topic",
          type: "text",
          placeholder: "Tema",
        },
        {
          name: "description",
          type: "text",
          placeholder: "Descripción",
        },
        {
          name: "points",
          type: "number",
          placeholder: "Puntos",
        },
        {
          name: "time",
          type: "number",
          placeholder: "Tiempo Límite",
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
            var challenge = {
              user: this.user.idRegistro,
              activity: this.activity,
              description: alertData.description,
              topic: alertData.topic,
              points: alertData.points,
              time: alertData.time,
              subject: this.subject.id,
              students: "",
              limitDate: alertData.limitDate,
            };
            this.createSubjectChallenge(challenge);
          },
        },
      ],
    });
    await alert.present();
  }

  createSubjectChallenge(challenge) {
    this.subjectSvc
      .createSubjectChallenge(challenge)
      .then(() => {
        this.getSubjectChallenges();
      })
      .catch((err) => console.log(err));
  }

  getSubjectChallenges() {
    this.subjectSvc
      .getSubjectChallenges(this.user.idRegistro, this.subject.id)
      .then((res: any) => {
        this.challenges = res.Success;
        this.gettingData = false;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.gettingData = false;
      });
  }

  async openSubjectStudentsModal(challenge) {
    const modal = await this.modalController.create({
      component: ModalStudentsPage,
      componentProps: {
        challenge,
      },
    });
    return await modal.present();
  }
}
