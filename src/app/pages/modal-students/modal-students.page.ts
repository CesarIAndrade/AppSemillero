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
    if (this.challenge.Estudiantes.length > 0) {
      this.challenge.Estudiantes.map((student) => {
        this.assignedStudents.push(student.cedula);
      });
    }
    this.getStudentSubjects(this.challenge.distribucion);
  }

  @Input() challenge: any;
  gettingData = true;
  students: any[] = [];
  assignedStudents: any[] = [];
  handleAssignment = true;
  masterCheck: boolean;

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  getStudentSubjects(subject) {
    this.subjectSvc
      .getSubjectStudents(subject)
      .then((res: any) => {
        this.students = res;
        this.students.map((student) => {
          this.assignedStudents.includes(student.Cedula)
            ? (student.checked = true)
            : (student.checked = false);
        });
        this.assignedStudents.length == this.students.length
          ? (this.masterCheck = true)
          : (this.masterCheck = false);
        this.gettingData = false;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.gettingData = false;
      });
  }

  async confirmSend() {
    const alert = await this.alertController.create({
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
            console.log(this.handleAssignment);
            
            this.handleAssignment
              ? this.assignChallenge()
              : this.unassignChallenge();
          },
        },
      ],
    });
    await alert.present();
  }

  checkAll(event) {
    if (event.target.checked) {
      this.students.map((student) => {
        student.checked = false;
      });
      this.handleAssignment = false;
    } else {
      this.students.map((student) => {
        student.checked = true;
      });
      this.handleAssignment = true;
    }
  }

  assignChallenge() {
    var students = [];
    this.students.map((student) => {
      if (student.checked == true) {
        students.push(student.Cedula);
      }
    });
    this.subjectSvc
      .assignChallenge(this.challenge.id, students)
      .then((res: any) => {
        console.log(res);
        if (res?.Success) {
          this.subjectSvc.refresh$.emit();
          this.dismiss();
        }
      })
      .catch((err) => console.log(err));
  }

  unassignChallenge() {
    var students = [];
    this.students.map((student) => {
      if (student.checked == false) {
        students.push(student.Cedula);
      }
    });
    this.subjectSvc
      .unassignChallenge(this.challenge.id, students)
      .then((res: any) => {
        console.log(res);
        if (res?.Success) {
          this.subjectSvc.refresh$.emit();
          this.dismiss();
        }
      })
      .catch((err) => console.log(err));
  }

  handleClick(student) {
    student.checked ? (student.checked = false) : (student.checked = true);
    const isBelowThreshold = (currentValue) => currentValue == student.checked;
    var students = [];
    this.students.map((student) => students.push(student.checked));
    this.masterCheck = students.every(isBelowThreshold);
  }
}
