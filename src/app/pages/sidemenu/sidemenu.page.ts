import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    private authSvc: AuthService
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
    this.appPages = JSON.parse(localStorage.getItem('routes'));
    console.log(this.appPages);
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
