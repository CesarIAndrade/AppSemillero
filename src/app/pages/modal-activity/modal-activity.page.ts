import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { SubjectService } from "src/app/services/subject.service";

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
    console.log(this.activity);
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
        console.log(res);
        this.challenges = res.Success;
        this.gettingData = false;
      })
      .catch((err) => console.log(err));
  }
}
