import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalScoresPage } from '../modal-scores/modal-scores.page';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  cards = [
    {
      name: 'Notas SGA',
      imageRoute: '../../assets/espam.png'
    },
    {
      name: 'Notas CAAI',
      imageRoute: '../../assets/caai.png'
    },
    {
      name: 'Notas CI',
      imageRoute: '../../assets/ci.png'
    },
  ]

  async presentModal(card) {
    const modal = await this.modalController.create({
      component: ModalScoresPage,
      componentProps: {
        'modalName': card.name
      }
    });
    return await modal.present();
  }

}
