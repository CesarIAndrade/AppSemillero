import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ScoresService } from "src/app/services/scores.service";
import { StudentService } from "src/app/services/student.service";
import { TeacherService } from "src/app/services/teacher.service";
import { ModalForumsPage } from "../modal-forums/modal-forums.page";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.page.html",
  styleUrls: ["./forum.page.scss"],
})
export class ForumPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private scoresSvc: ScoresService,
    private teacherSvc: TeacherService,
    private studentSvc: StudentService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.idTipo == 1) {
      this.getTeacherSchedule(this.user.cedula);
    } else {
      this.getStudentSubjects(this.user.cedula);
    }
  }

  user: any;
  subjects: any[] = [];
  gettingData = true;

  getStudentSubjects(document) {
    this.studentSvc
      .getStudentSubjects(document)
      .then((res: any) => {
        console.log(res);
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
        console.log(res);
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
}
