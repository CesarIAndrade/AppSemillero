import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-activity',
  templateUrl: './modal-activity.page.html',
  styleUrls: ['./modal-activity.page.scss'],
})
export class ModalActivityPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  @Input() subject: any;
  @Input() activity: string;

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async createChallenge() {
    var date = new Date().toJSON().split("T")[0];
    const alert = await this.alertController.create({
      header: "Crear reto",
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
