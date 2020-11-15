import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl, laravelApiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudentSubjects(document) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "GetMaterias/" + document).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getStudentAssignedChallenges(student, game) {
    const body = new HttpParams()
      .set("idRegistro", student)
      .set("idTipoReto", game);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "listarRetosEstd", body.toString(), {
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
