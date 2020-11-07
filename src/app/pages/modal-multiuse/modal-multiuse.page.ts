import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { ChallengesService } from "src/app/services/challenges.service";

@Component({
  selector: "app-modal-multiuse",
  templateUrl: "./modal-multiuse.page.html",
  styleUrls: ["./modal-multiuse.page.scss"],
})
export class ModalMultiusePage implements OnInit {
  constructor(
    private modalController: ModalController,
    private challengesSvc: ChallengesService,
    private alertController: AlertController
  ) {
    this.questionForm = new FormGroup({
      question: new FormControl("", Validators.required),
      answer_1: new FormControl("", Validators.required),
      answer_2: new FormControl("", Validators.required),
      answer_3: new FormControl("", Validators.required),
      answer_4: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  questionForm: FormGroup;
  @Input() challenge: any;
  user: any;
  correctAnswer = "0";

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  createQuestion() {
    if (this.questionForm.valid) {
      var answers = [];
      answers.push(
        this.questionForm.get("answer_1").value,
        this.questionForm.get("answer_2").value,
        this.questionForm.get("answer_3").value,
        this.questionForm.get("answer_4").value
      );
      this.challengesSvc
        .createChallengeQuestion(
          this.challenge.id,
          this.user.idRegistro,
          this.questionForm.get("question").value,
          answers,
          parseInt(this.correctAnswer)
        )
        .then((res: any) => {
          if (res?.Success) {
            this.challengesSvc.refresh$.emit();
            this.presentAlert(res.Success);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: "OK",
          handler: () => this.dismiss(),
        },
      ],
    });
    await alert.present();
  }
}
