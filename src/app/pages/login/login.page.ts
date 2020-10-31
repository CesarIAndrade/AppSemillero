import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit() {}

  loginForm: FormGroup;
  passwordInputType = "password";

  onSubmit() {
    this.authSvc
      .login(
        this.loginForm.get("username").value,
        this.loginForm.get("password").value
      )
      .then((res) => {
        if (res["usuario"]) {
          this.loginForm.reset();
          localStorage.setItem("user", JSON.stringify(res));
          if (res["idTipo"] == 1) {
            var appPages = [
              {
                title: "Actividades",
                icon: "game-controller",
                url: "/sidemenu/actividades",
              },
              {
                title: "Foros",
                icon: "list",
                url: "/sidemenu/foros",
              },
              {
                title: "Perfil",
                icon: "person",
                url: "/sidemenu/perfil",
              },
            ];
          } else {
            var appPages = [
              {
                title: "Inicio",
                icon: "home",
                url: "/sidemenu/estadisticas",
              },
              {
                title: "Notas",
                icon: "podium",
                url: "/sidemenu/notas",
              },
              {
                title: "Juegos",
                icon: "game-controller",
                url: "/sidemenu/juegos",
              },
              {
                title: "Perfil",
                icon: "person",
                url: "/sidemenu/perfil",
              },
              {
                title: "Foros",
                icon: "list",
                url: "/sidemenu/foros",
              },
            ];
          }
          localStorage.setItem("routes", JSON.stringify(appPages));
          this.router.navigateByUrl(appPages[0].url);
        } else {
          this.presentAlert('Datos incorrectos');
        }
      })
      .catch((err) => {
        console.log(err);
        this.presentAlert('Datos incorrectos');
      });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}
