import { Component, OnInit, Input } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ChallengesService } from "src/app/services/challenges.service";

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
    this.user = JSON.parse(localStorage.getItem("user"));

    this.groups.map((group: any) => {
      for (var j=0; j<3; j++) {
        group.items.push(j);
      }
    })

    console.log(this.groups);
    

    
  }

  @Input() challenge: any;
  user: any;
  questions: any[] = [];
  groups = [
    {
      name: "1",
      items: [],
      show: false
    },
    {
      name: "2",
      items: [],
      show: false
    },
    {
      name: "3",
      items: [],
      show: false
    }
  ];

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  getChallengeQuestions() {
    this.challengesSvc
      .getChallengeQuestions(this.challenge.id)
      .then((res: any) => {
        console.log(res);
        this.questions = res.Success;
      })
      .catch((err) => console.log(err));
  }

  async createQuestion() {
    var date = new Date().toJSON().split("T")[0];
    const alert = await this.alertController.create({
      header: "Crear Pregunta",
      inputs: [
        {
          name: "question",
          type: "text",
          placeholder: "Pregunta",
        },
        {
          name: "answer_1",
          type: "text",
          placeholder: "Respuesta #1",
        },
        {
          name: "answer_2",
          type: "text",
          placeholder: "Respuesta #2",
        },
        {
          name: "answer_3",
          type: "text",
          placeholder: "Respuesta #3",
        },
        {
          name: "answer_4",
          type: "text",
          placeholder: "Respuesta #4",
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Guardar",
          handler: (alertData) => {
            var answers = [
              alertData.answer_1,
              alertData.answer_2,
              alertData.answer_3,
              alertData.answer_4,
            ];
            this.createChallengeQuestion(alertData.question, answers)
          },
        },
      ],
    });
    await alert.present();
  }

  createChallengeQuestion(question, answers) {
    this.challengesSvc
      .createChallengeQuestion(
        this.challenge.id,
        this.user.idRegistro,
        question,
        answers
      )
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  toggleGroup(group) {
    group.show = !group.show;
  };

  isGroupShown(group) {
    return group.show;
  };

}