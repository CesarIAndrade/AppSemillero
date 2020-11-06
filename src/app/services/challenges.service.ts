import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { laravelApiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChallengesService {
  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();

  assignStudentsToChallenge(challenge, students) {
    const body = new HttpParams()
      .set("idReto", challenge)
      .set("estudiantes", students);
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

  unassignStudentsToChallenge(challenge, students) {
    const body = new HttpParams()
      .set("idReto", challenge)
      .set("estudiantes", students);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "quitEstReto", body.toString(), {
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

  changeChallengeState(challenge, state) {
    const body = new HttpParams().set("idReto", challenge).set("estado", state);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "modEstdReto", body.toString(), {
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

  getChallengeQuestions(challenge) {
    const body = new HttpParams().set("idReto", challenge);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "listarPreguntas", body.toString(), {
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

  createChallengeQuestion(challenge, user, question, answers) {
    const body = new HttpParams()
      .set("idReto", challenge)
      .set("idRegistro", user)
      .set("descripcion", question)
      .set("respuestas", answers);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "crearPreguntaReto", body.toString(), {
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
