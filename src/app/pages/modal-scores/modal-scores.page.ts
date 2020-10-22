import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ScoresService } from 'src/app/services/scores.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-modal-scores',
  templateUrl: './modal-scores.page.html',
  styleUrls: ['./modal-scores.page.scss'],
})
export class ModalScoresPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private scoresSvc: ScoresService,
    private actionSheetController: ActionSheetController,
    private studentSvc: StudentService,
    private subjectSvc: SubjectService
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(this.id == '1') {
      this.getStudentSubjects(user.cedula);
    } else if(this.id == '2') {
      this.getCAAIScores(user.idAlumno);
    } else {
      this.getCIScores(user.cedula)
    }
  }

  @Input() modalName: string;
  @Input() id: string;
  subjects: any[] = [];
  subjectSchedule: any[] = [];
  levels: any[] = [];

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  getStudentSubjects(document) {
    this.studentSvc.getStudentSubjects(document)
    .then((res: any) => {
      this.subjects = res;
    })
  }

  getSubjectSchedule(subject) {
    this.subjectSvc.getSubjectSchedule(subject)
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
