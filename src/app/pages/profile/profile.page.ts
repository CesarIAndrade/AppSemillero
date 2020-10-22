import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActionSheetController, PopoverController } from "@ionic/angular";
import { UserService } from 'src/app/services/user.service';
import { AvatarListComponent } from '../../components/avatar-list/avatar-list.component';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(
    private popoverController: PopoverController,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    this.setUserData();
    this.userSvc.refresh$.subscribe(() => {
      this.setUserData();
    })
  }

  imageSelected: string | ArrayBuffer;
  image: File;
  user = {
    name: "",
    username: "",
    document: "",
    phone: "",
    mail: "",
    avatar: ""
  };

  @ViewChild("imageInput") private imageInput: ElementRef;

  async editAvatar() {
    const popover = await this.popoverController.create({
      component: AvatarListComponent,
      translucent: true,
    });
    return await popover.present();
  }

  setUserData() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.user = {
      name: user.nombres,
      username: user.apodo,
      document: user.cedula,
      phone: user.celular,
      mail: user.correo,
      avatar: `../../../assets/avatars/${user.avatar}.png`
    };
  }
}
