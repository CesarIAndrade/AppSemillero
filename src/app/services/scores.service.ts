import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { apiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ScoresService {
  constructor(private http: HttpClient) {}

  getSGAScores() {
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "", {
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

  getCAAIScores() {
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "", {
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

  getCIScores() {
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "", {
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
