import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { WwtbmService } from "src/app/services/wwtbm.service";

@Component({
  selector: "app-modal-wwtbm",
  templateUrl: "./modal-wwtbm.page.html",
  styleUrls: ["./modal-wwtbm.page.scss"],
})
export class ModalWwtbmPage implements OnInit, AfterViewInit {
  constructor(
    private modalController: ModalController,
    private renderer: Renderer2,
    private wwtbmService: WwtbmService
  ) {}

  ngOnInit() {
    this.questions = this.challenge.Preguntas;
    this.challengeTime = parseInt(this.challenge.tiempoMinutos);
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngAfterViewInit() {
    this.timer();
    this.loadSlideQuestions(0);
  }

  @Input() challenge: any;
  questions: any[] = [];
  calculateClicked = false;
  challengeTime = 0;
  @ViewChild("countdownNumber", { read: ElementRef })
  countdownNumber: ElementRef;
  @ViewChild("content", { read: ElementRef })
  content: ElementRef;
  clickedAnswers = [];
  user: any;
  takedTime = 0;

  async loadSlideQuestions(questionIndex) {
    this.content.nativeElement.innerHTML = "";
    let question = this.questions[questionIndex];
    let answers = question.Respuestas;
    // slide
    let ionSlide = this.renderer.createElement("ion-slide");
    // div
    let div = this.renderer.createElement("div");
    // h1
    let h1 = this.renderer.createElement("h1");
    let h1Label = this.renderer.createText(question.descripcion);
    this.renderer.appendChild(h1, h1Label);
    // ionList
    let ionList = this.renderer.createElement("ion-list");
    answers.map((answer) => {
      let ionItem = this.renderer.createElement("ion-item");
      this.renderer.setAttribute(ionItem, "lines", "none");
      let ionItemLabel = this.renderer.createText(answer.descripcion);
      let ionIcon = this.renderer.createElement("ion-icon");
      this.renderer.setAttribute(ionIcon, "slot", "end");
      this.renderer.setAttribute(ionIcon, "hidden", "true");
      this.renderer.appendChild(ionItem, ionItemLabel);
      if (answer.esCorrecta === "1") {
        this.renderer.setAttribute(ionIcon, "name", "checkmark-circle-outline");
        this.renderer.setStyle(ionIcon, "color", "var(--ion-color-success)");
      } else {
        this.renderer.setAttribute(ionIcon, "name", "close-circle-outline");
        this.renderer.setStyle(ionIcon, "color", "var(--ion-color-danger)");
      }
      this.renderer.appendChild(ionItem, ionIcon);
      this.renderer.appendChild(ionList, ionItem);
      this.renderer.listen(ionItem, "click", () => {
        this.renderer.removeAttribute(ionIcon, "hidden");
        questionIndex += 1;
        var clickedAnswer = {
          question: question.id,
          answer: answer.id,
          correct: answer.esCorrecta,
        };
        this.clickedAnswers.push(clickedAnswer);
        if (this.questions.length > questionIndex) {
          var _setInterval = setTimeout(() => {
            this.loadSlideQuestions(questionIndex);
          }, 1500);
        } else {
          clearInterval(_setInterval);
          this.saveStudentAnswers();
        }
      });
    });
    // building DOM
    this.renderer.appendChild(div, h1);
    this.renderer.appendChild(div, ionList);
    this.renderer.appendChild(ionSlide, div);
    this.renderer.appendChild(this.content.nativeElement, ionSlide);
    this.renderer.addClass(this.content.nativeElement, "dynamicSlide");
  }

  timer() {
    // Math.floor(this.challengeTime * 60)
    var countdown = 5;
    this.countdownNumber.nativeElement.innerHTML = countdown;
    var _setInterval = setInterval(() => {
      countdown = --countdown;
      this.takedTime += 1;
      this.countdownNumber.nativeElement.innerHTML = countdown;
      if (countdown === 0) {
        clearInterval(_setInterval);
        this.saveStudentAnswers();
        this.dismiss();
      }
    }, 1000);
  }

  dismiss() {
    this.questions.map((question) => {
      question.Respuestas.map((answer) => {
        answer.clicked = false;
      });
    });
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  saveStudentAnswers() {
    this.wwtbmService
      .saveStudentAnswers(
        this.user.idRegistro,
        this.challenge.id,
        this.takedTime,
        this.clickedAnswers
      )
      .then((res) => {
        console.log(res);
        this.dismiss();
      })
      .catch((err) => console.log(err));
  }
}
