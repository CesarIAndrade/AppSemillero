import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { ChallengesService } from "src/app/services/challenges.service";

@Component({
  selector: "app-modal-challenge-question",
  templateUrl: "./modal-challenge-question.html",
  styleUrls: ["./modal-challenge-question.scss"],
})
export class ModalChallengeQuestionPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private challengesSvc: ChallengesService,
    private alertController: AlertController
  ) {
    this.questionForm = new FormGroup({
      questionId: new FormControl(""),
      question: new FormControl("", Validators.required),
      answer_1: new FormControl("", Validators.required),
      answer_2: new FormControl("", Validators.required),
      answer_3: new FormControl("", Validators.required),
      answer_4: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.question) {
      this.questionForm.setValue({
        questionId: this.question.id,
        question: this.question.descripcion,
        answer_1: this.question.Respuestas[0].descripcion,
        answer_2: this.question.Respuestas[1].descripcion,
        answer_3: this.question.Respuestas[2].descripcion,
        answer_4: this.question.Respuestas[3].descripcion
      });
      this.correctAnswer = this.question.correctAnswer;
      this.validateSubmit = "edit";
    }
  }

  questionForm: FormGroup;
  @Input() challenge: any;
  user: any;
  correctAnswer = "0";
  @Input() question: any;
  validateSubmit: string;

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
      var question = {
        challenge: this.challenge.id,
        user: this.user.idRegistro,
        question: this.questionForm.get("question").value,
        answers: answers,
        correctAnswer: parseInt(this.correctAnswer),
      };
      this.challengesSvc
        .createChallengeQuestion(question)
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

  handleSubmit() {
    if(this.validateSubmit == "edit") {
      this.editQuestion();
    } else {
      this.createQuestion();
    }
  }

  editQuestion() {
    if (this.questionForm.valid) {
      var answers = [];
      answers.push(
        this.questionForm.get("answer_1").value,
        this.questionForm.get("answer_2").value,
        this.questionForm.get("answer_3").value,
        this.questionForm.get("answer_4").value
      );
      var question = {
        id: this.questionForm.get("questionId").value,
        challenge: this.challenge.id,
        user: this.user.idRegistro,
        question: this.questionForm.get("question").value,
        answers: answers,
        correctAnswer: parseInt(this.correctAnswer),
      };
      this.challengesSvc
        .editChallengeQuestion(question)
        .then((res: any) => {
          if (res?.Success) {
            this.challengesSvc.refresh$.emit();
            this.presentAlert(res.Success);
          }
        })
        .catch((err) => console.log(err));
    }
  }
}
