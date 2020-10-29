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
  gettingData = true;

  getGameTypes() {
    this.activitiesSvc
      .getGameTypes()
      .then((res: any) => {
        this.gameTypes = res;
        this.gettingData = false;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.gettingData = false;
      })
  }

  tabChange(event) {
    this.selectedActivity = event.detail.value;
  }
}
