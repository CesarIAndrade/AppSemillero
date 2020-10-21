import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(private actionSheetController: ActionSheetController) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.user = {
      name: user.nombres,
      username: user.apodo,
      document: user.cedula,
      phone: user.celular,
      mail: user.correo
    }

  }

  imageSelected: string | ArrayBuffer;
  image: File;
  user = {
    name: '',
    username: '',
    document: '',
    phone: '',
    mail: ''
  }

  @ViewChild('imageInput') private imageInput: ElementRef;

  async editAvatar() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: "Seleccionar imagen",
          icon: "image-outline",
          handler: () => {
            this.imageInput.nativeElement.click();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.image);
    }
  }
}
