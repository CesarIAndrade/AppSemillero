import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import * as signalR from "@aspnet/signalr";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit() {}

  loginForm: FormGroup;
  passwordInputType = "password";
  hubConnection: signalR.HubConnection;

  onSubmit() {
    this.authSvc
      .login(
        this.loginForm.get("username").value,
        this.loginForm.get("password").value
      )
      .then((res) => {
        console.log(res);
        if (res["usuario"]) {
          localStorage.setItem("user", JSON.stringify(res));
          // this.router.navigate(["/sidemenu"]);
          this.crearConexion();
        } else {
          alert("no user!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  crearConexion() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl("http://26.175.169:92/ChatHub?user=Cesar", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {})
      .catch((err) => {
        console.log("Error while establishing connection :(");
      });
    this.hubConnection.on("nuevoInicio", (mensaje: string) => {
      console.log("mensaje", mensaje);
    });
  }
}
