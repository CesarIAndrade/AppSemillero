import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

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
    private userSvc: UserService
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
    console.log(this.router.url);
    
    this.setUserData();
    this.userSvc.refresh$.subscribe(() => {
      this.setUserData();
    })
    this.appPages = JSON.parse(localStorage.getItem('routes'));
    this.selectedIndex = this.appPages.findIndex(
      (page) => page.url.split("/")[2] === this.router.url.split("/")[2]
    );
  }

  selectedIndex = 0;
  appPages = [];
  user: any;

  logout() {
    this.appPages = [];
    this.user = {};
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  setUserData() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.router.navigate(["/login"]);
    }
    /////////Luis Chichanda Locura/////////
    if (user.avatar != "N/A" ){
      user.avatar = `../../../assets/avatars/${user.avatar}.png`;
    }else{
      user.avatar = `../../../assets/avatars/default.png`;
    }
    ///////////////////////////////////////
    /* user.avatar = `../../../assets/avatars/${user.avatar}.png`; */ //esto es de Cesar
    user.names = `${user.nombres.split(" ")[0]} ${user.nombres.split(" ")[2]}`;
    this.user = user;
  }
}
