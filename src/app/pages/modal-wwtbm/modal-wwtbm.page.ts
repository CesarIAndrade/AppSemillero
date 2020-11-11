import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-wwtbm",
  templateUrl: "./modal-wwtbm.page.html",
  styleUrls: ["./modal-wwtbm.page.scss"],
})
export class ModalWwtbmPage implements OnInit, AfterViewInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.questions = this.challenge.Preguntas;
    this.challengeTime = parseInt(this.challenge.tiempoSegundos);
  }

  ngAfterViewInit() {
    this.timer();
  }

  timer() {
    var countdown = 5;
    this.countdownNumber.nativeElement.innerHTML = countdown;
    var _setInterval = setInterval(() => {
      countdown = --countdown;
      this.countdownNumber.nativeElement.innerHTML = countdown;
      if (countdown === 0) {
        clearInterval(_setInterval)
        this.dismiss();
      }
    }, 1000);
  }

  @Input() challenge: any;
  questions: any[] = [];
  points: number = 0;
  calculateClicked = false;
  challengeTime: number = 0;
  @ViewChild("countdownNumber", { read: ElementRef })
  countdownNumber: ElementRef;

  dismiss() {
    this.questions.map((question) => {
      question.Respuestas.map((answer) => {
        answer.clicked = false;
      });
    });
    this.modalController.dismiss({
      role: "destructive",
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

  getResult() {
    var correctAnswers = 0;
    this.questions.map((question) => {
      if (question.validate === "1") {
        correctAnswers = correctAnswers + 1;
      }
    });
    if (correctAnswers != 0) {
      this.calculateClicked = true;
      this.points =
        (parseInt(this.challenge.puntos) / this.questions.length) *
        correctAnswers;
    }
  }
}
