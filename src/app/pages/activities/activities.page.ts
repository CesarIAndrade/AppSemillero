import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ActivitiesService } from "src/app/services/activities.service";
import { TeacherService } from "src/app/services/teacher.service";
import { ModalActivityPage } from '../modal-activity/modal-activity.page';

@Component({
  selector: "app-activities",
  templateUrl: "./activities.page.html",
  styleUrls: ["./activities.page.scss"],
})
export class ActivitiesPage implements OnInit {
  constructor(
    private activitiesSvc: ActivitiesService,
    private teacherSvc: TeacherService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.getGameTypes();
    this.getTeacherSchedule(user.cedula);
  }

  gameTypes: any[] = [];
  subjects: any[] = [];
  gettingData = true;
  selectedActivity = "1";

  getGameTypes() {
    this.activitiesSvc
      .getGameTypes()
      .then((res: any) => {
        this.gameTypes = res;
      })
      .catch((err) => console.log(err));
  }

  getTeacherSchedule(document) {
    this.teacherSvc.getTeacherSchedule(document)
    .then((res: any) =>{
      console.log(res);
      var subjects = []
      res.map((item) => {
        subjects.push({
          id: item.DistribucionId,
          name: item.Nombre
        })
      })
      this.subjects = subjects;
      this.gettingData = false;
    }).catch((err) => console.log(err));
  }

  async openSubjectActivitiesModal(subject) {
    const modal = await this.modalController.create({
      component: ModalActivityPage,
      componentProps: {
        subject,
        activity: this.selectedActivity
      },
    });
    return await modal.present();
  }

  tabChange(event) {
    this.selectedActivity = event.detail.value;
  }
}
