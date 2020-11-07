import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: "app-wwtbm",
  templateUrl: "./wwtbm.page.html",
  styleUrls: ["./wwtbm.page.scss"],
})
export class WwtbmPage implements OnInit {
  constructor(private studentSvc: StudentService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getStudentAssignedChallenges();
    this.getStudentSubjects();

  }

  user: any;
  subjects: any[] = [];
  challenges: any[] = [];
  gettingData = true;

  getStudentAssignedChallenges() {
    this.studentSvc
      .getStudentAssignedChallenges(this.user.idRegistro, "2")
      .then((res: any) => {
        res.Success.map((challenge) => {
          var subject = this.subjects.find(
            (subject) => subject.DISTRO === parseInt(challenge.distribucion)
          );
          challenge.subject = subject.MATERIA;
          this.challenges.push(challenge);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.gettingData = false;
      });
  }

  getStudentSubjects() {
    this.studentSvc
      .getStudentSubjects(this.user.cedula)
      .then((res: any) => {    
        this.subjects = res; 
        this.gettingData = false;
      })
      .catch((err) => console.log(err));
  }
}
