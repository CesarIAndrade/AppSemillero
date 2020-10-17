import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { apiUrl, realTimeApiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new HttpParams()
      .set("cedula", username)
      .set("clave", password)
      .set("token", "token");
    return new Promise((resolve, reject) => {
      this.http
        .post(realTimeApiUrl + "Login", body.toString(), {
          headers: new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          ),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
