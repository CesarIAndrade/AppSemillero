import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  constructor(
    private activitiesSvc: ActivitiesService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getGameTypes();
  }

  gameTypes: any[] = [];

  getGameTypes() {
    this.activitiesSvc.getGameTypes()
    .then((res: any) => {
      console.log(res);
      this.gameTypes = res;
    })
    .catch(err => console.log(err))
  }

  async createChallenge() {
    var date = new Date().toJSON().split("T")[0];
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Prompt!",
      inputs: [
        {
          name: "topic",
          type: "text",
          placeholder: "Tema",
        },
        {
          name: "subTopic",
          type: "text",
          placeholder: "SubTema",
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
            // this.forumsSvc
            //   .createForum(
            //     alertData.topic,
            //     alertData.subTopic,
            //     alertData.limitDate,
            //     this.user.idRegistro
            //   )
            //   .then((res) => this.getForums(this.user.idRegistro))
            //   .catch((err) => console.log(err));
          },
        },
      ],
    });
    await alert.present();
  }
}
