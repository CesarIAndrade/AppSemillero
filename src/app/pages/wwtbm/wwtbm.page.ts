import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { StudentService } from "src/app/services/student.service";
import { ModalWwtbmPage } from "src/app/pages/modal-wwtbm/modal-wwtbm.page";

@Component({
  selector: "app-wwtbm",
  templateUrl: "./wwtbm.page.html",
  styleUrls: ["./wwtbm.page.scss"],
})
export class WwtbmPage implements OnInit {
  constructor(
    private studentSvc: StudentService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getStudentSubjects();
  }

  user: any;
  subjects: any[] = [];
  challenges: any[] = [];
  gettingData = true;

  getStudentAssignedChallenges() {
    this.studentSvc
      .getStudentAssignedChallenges(this.user.idRegistro, "2")
      .then((res: any) => {
        res.Success.map((challenge) => {
          var subject = this.subjects.find(
            (subject) => subject.DISTRO === parseInt(challenge.distribucion)
          );
          challenge.subject = subject.MATERIA;
          this.challenges.push(challenge);
        });
        this.gettingData = false;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.gettingData = false;
      });
  }

  getStudentSubjects() {
    this.studentSvc
      .getStudentSubjects(this.user.cedula)
      .then((res: any) => {
        this.subjects = res;
        this.getStudentAssignedChallenges();
      })
      .catch((err) => console.log(err));
  }

  async openModalChallenge(challenge) {
    if (challenge.numeroIntentos === challenge.numeroIntentosRestantes) {
      const alert = await this.alertController.create({
        header: "Número máximo de intentos alcanzados",
        buttons: ["OK"],
      });
      await alert.present();
    } else {
      const modal = await this.modalController.create({
        component: ModalWwtbmPage,
        componentProps: {
          challenge: challenge,
        },
      });
      return await modal.present();
    }
  }
}
