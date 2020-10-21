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

  getSubjectChallenges(id) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "Retos/" + id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  createSubjectChallenge(
    id,
    gameType,
    topic,
    description,
    points,
    time,
    subject
  ) {
    const body = new HttpParams()
      .set("idUsuario", id)
      .set("idtipo", gameType)
      .set("tema", topic)
      .set("decripcion", description)
      .set("puntos", points)
      .set("tiempoSegundos", time)
      .set("distribucion", subject);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "Retos", body.toString(), {
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
