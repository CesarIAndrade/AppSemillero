import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-wwtbm",
  templateUrl: "./modal-wwtbm.page.html",
  styleUrls: ["./modal-wwtbm.page.scss"],
})
export class ModalWwtbmPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.questions = this.challenge.Preguntas;
    console.log(this.challenge);
  }

  @Input() challenge: any;
  questions: any[] = [];

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  handleAnswer(answer, question) {
    if (!answer.clicked) {
      if (answer.esCorrecta === "1") {
        answer.icon = "checkmark-circle-outline";
        answer.iconStyle = "color: var(--ion-color-success)";
      } else {
        answer.icon = "close-circle-outline";
        answer.iconStyle = "color: var(--ion-color-danger)";
      }
    }
    question.validate = answer.esCorrecta;
    question.Respuestas.map((answer) => (answer.clicked = true));
  }

  puntaje: number;

  getResult() {
    var correctAnswers = 0;
    this.questions.map((question) => {
      if(question.validate === "1") {
        correctAnswers = correctAnswers + 1;
      }
    })
    this.puntaje = (parseInt(this.challenge.puntos) / this.questions.length) * correctAnswers;
  }
}
