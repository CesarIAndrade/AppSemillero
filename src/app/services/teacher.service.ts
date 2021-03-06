import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getTeacherSchedule(document) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "CargaHoraria/" + document).subscribe(
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
