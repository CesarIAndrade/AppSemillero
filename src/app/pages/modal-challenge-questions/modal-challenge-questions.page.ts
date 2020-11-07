import { Component, OnInit, Input } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ChallengesService } from "src/app/services/challenges.service";
import { ModalMultiusePage } from "../modal-multiuse/modal-multiuse.page";

@Component({
  selector: "app-modal-challenge-questions",
  templateUrl: "./modal-challenge-questions.page.html",
  styleUrls: ["./modal-challenge-questions.page.scss"],
})
export class ModalChallengeQuestionsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private challengesSvc: ChallengesService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getChallengeQuestions();
    this.challengesSvc.refresh$.subscribe(() => {
      this.questions = [];
      this.getChallengeQuestions();
    });
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  @Input() challenge: any;
  user: any;
  questions: any[] = [];
  gettingData = true;

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  getChallengeQuestions() {
    this.challengesSvc
      .getChallengeQuestions(this.challenge.id)
      .then((res: any) => {
        res.Success.map((question) => {
          question.show = true;
          var correctAnswer = question.Respuestas.find(
            (answer) => answer.esCorrecta == "1"
          );
          question.Respuestas.map((answer) => {
            if (answer.esCorrecta == "1") {
              answer.styles =
                "  border-left: 2px solid var(--ion-color-success);";
            }
          });
          const index = question.Respuestas.indexOf(correctAnswer);
          question.correctAnswer = String(index);
          this.questions.push(question);
        });
        console.log(this.questions);

        this.gettingData = false;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.gettingData = false;
      });
  }

  async openCreateChallengeQuestionModal() {
    const modal = await this.modalController.create({
      component: ModalMultiusePage,
      componentProps: {
        challenge: this.challenge,
      },
    });
    return await modal.present();
  }

  toggleGroup(group) {
    group.show = !group.show;
  }

  isGroupShown(group) {
    return group.show;
  }

  convertIndexToString(i) {
    return String(i);
  }

  async changeAnswer(question, answer, event) {
    console.log(event);
    
    const alert = await this.alertController.create({
      message: '¿Desea cambiar la respuesta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.challengesSvc.changeQuestionAnswer(question.id, answer.id)
            .then(res => {
              console.log(res);
            }).catch((err) => console.log(err))
          }
        }
      ]
    });

    await alert.present();
  }
}
