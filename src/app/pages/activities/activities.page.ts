import { Component, OnInit } from "@angular/core";
import { ActivitiesService } from "src/app/services/activities.service";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.page.html",
  styleUrls: ["./activities.page.scss"],
})
export class ActivitiesPage implements OnInit {
  constructor(
    private activitiesSvc: ActivitiesService
  ) {}

  ngOnInit() {
    this.getGameTypes();
  }

  gameTypes: any[] = [];
  selectedActivity = "1";
  gettingData = false;

  getGameTypes() {
    this.activitiesSvc
      .getGameTypes()
      .then((res: any) => {
        this.gameTypes = res;
        this.gettingData = true;
      })
      .catch((err) => console.log(err));
  }

  tabChange(event) {
    this.selectedActivity = event.detail.value;
  }
}
