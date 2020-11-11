import { Component, Input, OnInit } from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { ChallengesService } from "src/app/services/challenges.service";
import { SubjectService } from "src/app/services/subject.service";
import { ModalStudentsPage } from "../modal-students/modal-students.page";
import { ModalChallengeQuestionsPage } from "../modal-challenge-questions/modal-challenge-questions.page";

@Component({
  selector: "app-modal-activity",
  templateUrl: "./modal-activity.page.html",
  styleUrls: ["./modal-activity.page.scss"],
})
export class ModalActivityPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private subjectSvc: SubjectService,
    private challengesSvc: ChallengesService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getSubjectChallenges();
    this.challengesSvc.refresh$.subscribe(() => {
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

  async presentActionSheet(challenge) {
    var state: string;
    var stateIcon: string;
    if (challenge.estado == "1") {
      state = "Deshabilitar";
      stateIcon = "eye-off-outline";
    } else {
      state = "Habilitar";
      stateIcon = "eye-outline";
    }
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Ver preguntas",
          icon: "list-outline",
          handler: () => {
            this.openChanllengeQuestionsModal(challenge);
          },
        },
        {
          text: "Modificar",
          icon: "settings-outline",
          handler: () => {
            this.createOrEditChallenge(challenge);
          },
        },
        {
          text: "Asignar reto",
          icon: "paper-plane-outline",
          handler: () => {
            this.openSubjectStudentsModal(challenge);
          },
        },
        {
          text: state,
          icon: stateIcon,
          handler: () => {
            this.changeChallengeState(challenge);
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async createOrEditChallenge(challenge) {
    let date;
    let handlerSubmit;
    console.log(challenge);

    if (challenge) {
      date = challenge.fecha_creacion.split(" ")[0];
      handlerSubmit = "edit";
    } else {
      date = new Date().toJSON().split("T")[0];
    }
    const alert = await this.alertController.create({
      header: "Crear reto",
      inputs: [
        {
          name: "topic",
          type: "text",
          placeholder: "Tema",
          value: challenge ? challenge.tema : "",
        },
        {
          name: "description",
          type: "text",
          placeholder: "Descripción",
          value: challenge ? challenge.descripcion : "",
        },
        {
          name: "points",
          type: "number",
          placeholder: "Puntos",
          value: challenge ? challenge.puntos : "",
        },
        {
          name: "time",
          type: "number",
          placeholder: "Tiempo Límite",
          value: challenge ? challenge.tiempoSegundos : "",
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
            handlerSubmit == "edit"
              ? this.editSubjectChallenge(alertData, challenge.id)
              : this.createSubjectChallenge(alertData);
          },
        },
      ],
    });
    await alert.present();
  }

  createSubjectChallenge(alertData) {
    var challenge = {
      user: this.user.idRegistro,
      activity: this.activity,
      description: alertData.description,
      topic: alertData.topic,
      points: alertData.points,
      time: alertData.time,
      subject: this.subject.id,
      limitDate: alertData.limitDate,
    };
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
        var enabledChallenges = [];
        var disabledChallenges = [];
        res.Success.map((challenge) => {
          challenge.estado == "1"
            ? enabledChallenges.push(challenge)
            : disabledChallenges.push(challenge);
        });
        this.challenges = [
          {
            label: "Habilitados",
            state: "1",
            challenges: enabledChallenges,
          },
          {
            label: "Deshabilitados",
            state: "0",
            challenges: disabledChallenges,
          },
        ];
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

  changeChallengeState(challenge) {
    var challengeState: string;
    challenge.estado == "1" ? (challengeState = "0") : (challengeState = "1");
    challenge.estado = challengeState;
    this.challengesSvc
      .changeChallengeState(challenge.id, challengeState)
      .then((res) => {
        this.getSubjectChallenges();
      })
      .catch((err) => console.log(err));
  }

  async openChanllengeQuestionsModal(challenge) {
    const modal = await this.modalController.create({
      component: ModalChallengeQuestionsPage,
      componentProps: {
        challenge,
      },
    });
    return await modal.present();
  }

  editSubjectChallenge(alertData, challengeId) {
    var challenge = {
      id: challengeId,
      description: alertData.description,
      topic: alertData.topic,
      points: alertData.points,
      time: alertData.time,
      subject: this.subject.id,
      limitDate: alertData.limitDate,
    };
    this.subjectSvc
      .editSubjectChallenge(challenge)
      .then(() => {
        this.getSubjectChallenges();
      })
      .catch((err) => console.log(err));
  }
}
