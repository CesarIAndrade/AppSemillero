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
    console.log(this.user);
    
    this.getStudentAssignedChallenges();
  }

  user: any;

  getStudentAssignedChallenges() {
    this.studentSvc
      .getStudentAssignedChallenges(this.user.idRegistro, "2")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
}
