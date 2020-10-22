import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { apiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();

  changeAvatar(user, avatar) {
    const body = new HttpParams().set("idRegistro", user).set("avatar", avatar);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "ModificarRegistro", body.toString(), {
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
