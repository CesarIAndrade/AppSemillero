import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

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

  onSubmit() {
    this.authSvc
      .login(
        this.loginForm.get("username").value,
        this.loginForm.get("password").value
      )
      .then( async res => {
        console.log(res);
        if (res["usuario"]) {
          localStorage.setItem("user", JSON.stringify(res));
          // this.router.navigate(["/sidemenu"]);
          // await this.authSvc.createConnection();
        } else {
          alert("no user!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
