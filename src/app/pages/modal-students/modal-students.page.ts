import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { SubjectService } from "src/app/services/subject.service";

@Component({
  selector: "app-modal-students",
  templateUrl: "./modal-students.page.html",
  styleUrls: ["./modal-students.page.scss"],
})
export class ModalStudentsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private subjectSvc: SubjectService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getStudentSubjects(this.challenge.distribucion);
  }

  @Input() challenge: any;
  gettingData = true;
  students: any[] = [];

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  getStudentSubjects(subject) {
    this.subjectSvc
      .getSubjectStudents(subject)
      .then((res: any) => {
        console.log(res);
        this.students = res;
        this.gettingData = false;
      })
      .catch((err) => console.log(err));
  }

  async confirmSend() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Desea enviar a todos los estudiantes",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Okay",
          handler: () => {
            var students = [];
            this.students.map((student) => {
              students.push(student.Cedula);
            });
            this.subjectSvc
              .assignChallenge(this.challenge.distribucion, students)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
          },
        },
      ],
    });

    await alert.present();
  }
}
