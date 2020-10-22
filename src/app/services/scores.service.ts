import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { apiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ScoresService {
  constructor(private http: HttpClient) {}

  getCAAIScores(student) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "NotasCai/" + student).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getCIScores(document) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "NotasCi/" + document).subscribe(
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
