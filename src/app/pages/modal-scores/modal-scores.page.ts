import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-modal-scores',
  templateUrl: './modal-scores.page.html',
  styleUrls: ['./modal-scores.page.scss'],
})
export class ModalScoresPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private scoresSvc: ScoresService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(this.id == '1') {
      this.getCurrentSubjects(user.cedula);
    } else if(this.id == '2') {
      this.getCAAIScores(user.idAlumno);
    } else {
      this.getCIScores(user.cedula)
    }
  }

  @Input() modalName: string;
  @Input() id: string;
  subjects = [
    {
      AA: 0,
      AADAC: 7,
      Asistencia: null,
      DISTRO: 17751,
      Disponibles: 0,
      ESTADO: "",
      EXAMEN: 0,
      MATERIA: "DESARROLLO DE TESIS",
      NOTAGLOBAL: 0,
      PAEA: 0,
      Realizados: 0,
      SEMESTRE: "10 A",
      SUBTOTAL: 1.75,
      SUPLETORIO: 0,
    }
  ];
  subjectSchedule = [];
  levels = [];

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  getCurrentSubjects(document) {
    this.scoresSvc.getCurrentSubjects(document)
    .then((res: any) => {
      this.subjects = res;
    })
  }

  getSubjectSchedule(subject) {
    this.scoresSvc.getSubjectSchedule(subject)
    .then((res: any) => {      
      this.showBottonSheet(res);
    })
  }

  async showBottonSheet(subjectSchedule) {
    var _buttons = []
    subjectSchedule.map((schedule) => {
      _buttons.push({
        text: `${schedule.Dia}: ${schedule.Entrada} - ${schedule.Salida}`,
      })
    })
    const actionSheet = await this.actionSheetController.create({
      buttons: _buttons,
    });
    await actionSheet.present();
  }

  getCAAIScores(studentId) {
    this.scoresSvc.getCAAIScores(studentId)
    .then((res: any) => {
      this.levels = res;
    })
  }

  getCIScores(document) {
    this.scoresSvc.getCIScores(document)
    .then((res: any) => {
      this.levels = res;
    })
  }
}
