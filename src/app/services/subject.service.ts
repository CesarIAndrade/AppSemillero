import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl, laravelApiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  getSubjectSchedule(subject) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + `Horarios/${subject}`, {
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

  getSubjectForums(subject) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + "GetForosDistributivo/?iddistributivo=" + subject)
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

  getSubjectChallenges(user, subject) {
    const body = new HttpParams()
      .set("idRegistro", user)
      .set("distribucion", subject);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "listarRetos", body.toString(), {
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

  createSubjectChallenge(challenge) {
    const body = new HttpParams()
      .set("idCreador", challenge.user)
      .set("idTipoReto", challenge.activity)
      .set("descripcion", challenge.description)
      .set("tema", challenge.topic)
      .set("puntos", challenge.points)
      .set("tiempoSegundos", challenge.time)
      .set("distribucion", challenge.subject)
      .set("estudiantes", challenge.students)
      .set("fechaFin", challenge.limitDate);
    console.log(body);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "crearReto", body.toString(), {
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

  getSubjectStudents(subject) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "/Alumnos/" + subject).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  assignChallenge(challenge, students) {
    const body = new HttpParams()
      .set("idReto", challenge)
      .set("estudiantes", students)
    console.log(body);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "asigEstReto", body.toString(), {
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
