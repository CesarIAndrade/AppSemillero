import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-avatar-list",
  templateUrl: "./avatar-list.component.html",
  styleUrls: ["./avatar-list.component.scss"],
})
export class AvatarListComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userAvatar = this.user.avatar;
  }

  user: any;
  userAvatar: string;
  avatar_list = [
    {
      name: "1",
      class: "",
      url: "../../assets/avatars/1.png",
    },
    {
      name: "2",
      class: "",
      url: "../../assets/avatars/2.png",
    },
    {
      name: "3",
      class: "",
      url: "../../assets/avatars/3.png",
    },
    {
      name: "4",
      class: "",
      url: "../../assets/avatars/4.png",
    },
    {
      name: "5",
      class: "",
      url: "../../assets/avatars/5.png",
    },
    {
      name: "6",
      class: "",
      url: "../../assets/avatars/6.png",
    },
    {
      name: "default",
      class: "",
      url: "../../assets/avatars/default.png",
    },
  ];

  changeAvatar(avatar) {
    this.userSvc
      .changeAvatar(this.user.idRegistro, avatar)
      .then((res: any) => {
        localStorage.setItem("user", JSON.stringify(res));
        this.userSvc.refresh$.emit();
        this.dismiss();
      })
      .catch((err) => console.log(err));
  }

  dismiss() {
    this.popoverController.dismiss({
      dismissed: true,
    });
  }
}
