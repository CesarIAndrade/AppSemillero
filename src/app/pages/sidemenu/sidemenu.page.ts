import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { ScoresService } from "src/app/services/scores.service";

@Component({
  selector: "app-sidemenu",
  templateUrl: "./sidemenu.page.html",
  styleUrls: ["./sidemenu.page.scss"],
})
export class SidemenuPage implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.router.navigate(["/login"]);
    }
    this.email = user.correo;
    this.names = `${user.nombres.split(" ")[0]} ${user.nombres.split(" ")[2]}`;
    if (user.idTipo == 1) {
      this.appPages = [
        {
          title: "Actividades",
          icon: "game-controller",
          url: "/sidemenu/actividades",
        },
        {
          title: "Foros",
          icon: "list-outline",
          url: "/sidemenu/foros",
        },
      ];
    } else {
      this.appPages = [
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

    this.selectedIndex = this.appPages.findIndex(
      (page) => page.url.split("/")[2] === this.router.url.split("/")[2]
    );
  }

  selectedIndex = 0;
  appPages = [];
  email: string;
  names: string;

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
