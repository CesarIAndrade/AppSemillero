import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-scores',
  templateUrl: './modal-scores.page.html',
  styleUrls: ['./modal-scores.page.scss'],
})
export class ModalScoresPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.modalName);
    
  }

  @Input() modalName: string;

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
