import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StudentService } from "src/app/services/student.service";
import { TeacherService } from "src/app/services/teacher.service";
import { ModalForumsPage } from "../../pages/modal-forums/modal-forums.page";
import { ModalActivityPage } from "../../pages/modal-activity/modal-activity.page";
import { Router } from '@angular/router';

@Component({
  selector: "app-subject-list",
  templateUrl: "./subject-list.component.html",
  styleUrls: ["./subject-list.component.scss"],
})
export class SubjectListComponent implements OnInit {
  constructor(
    private teacherSvc: TeacherService,
    private studentSvc: StudentService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.idTipo == 1) {
      this.getTeacherSchedule(this.user.cedula);
    } else {
      this.getStudentSubjects(this.user.cedula);
    }
  }

  subjects: any[] = [];
  user: any;
  gettingData = true;
  @Input() selectedActivity: string;

  getStudentSubjects(document) {
    this.studentSvc
      .getStudentSubjects(document)
      .then((res: any) => {
        var subjects = [];
        res.map((item) => {
          subjects.push({
            id: item.DISTRO,
            name: item.MATERIA,
          });
        });
        this.subjects = subjects;
        this.gettingData = false;
      })
      .catch((err) => console.log(err));
  }

  getTeacherSchedule(document) {
    this.teacherSvc
      .getTeacherSchedule(document)
      .then((res: any) => {
        var subjects = [];
        res.map((item) => {
          subjects.push({
            id: item.DistribucionId,
            name: item.Nombre,
          });
        });
        this.subjects = subjects;
        this.gettingData = false;
      })
      .catch((err) => console.log(err));
  }

  async openSubjectForumsModal(subject) {
    const modal = await this.modalController.create({
      component: ModalForumsPage,
      componentProps: {
        subject,
      },
    });
    return await modal.present();
  }

  async openSubjectActivitiesModal(subject) {
    const modal = await this.modalController.create({
      component: ModalActivityPage,
      componentProps: {
        subject,
        activity: this.selectedActivity,
      },
    });
    return await modal.present();
  }

  handleClick(subject) {
    if(this.router.url.split('/')[2] == 'foros') {
      this.openSubjectForumsModal(subject);
    } else {
      this.openSubjectActivitiesModal(subject);
    }
  }
}
