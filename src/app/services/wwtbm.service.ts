import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { laravelApiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WwtbmService {
  constructor(private http: HttpClient) {}

  createChallenge(challenge) {
    const body = new HttpParams()
      .set("idCreador", challenge.user)
      .set("idTipoReto", challenge.activity)
      .set("descripcion", challenge.description)
      .set("tema", challenge.topic)
      .set("numeroIntentos", challenge.maxAttempts)
      .set("numeroPreguntas", challenge.maxQuestions)
      .set("tiempoSegundos", challenge.time)
      .set("distribucion", challenge.subject)
      .set("fechaFin", challenge.limitDate);
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

  editChallenge(challenge) {
    const body = new HttpParams()
      .set("idReto", challenge.id)
      .set("descripcion", challenge.description)
      .set("tema", challenge.topic)
      .set("numeroIntentos", challenge.maxAttempts)
      .set("numeroPreguntas", challenge.maxQuestions)
      .set("tiempoSegundos", challenge.time)
      .set("distribucion", challenge.subject)
      .set("fechaFin", challenge.limitDate);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "modificarReto", body.toString(), {
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

  saveStudentAnswers(student, challenge, takedTime, answers) {
    var _questions = [];
    var _answers = [];
    var _corrects = [];
    answers.map((answer) => {
      _questions.push(answer.question);
      _answers.push(answer.answer);
      _corrects.push(answer.correct);
    });
    const body = new HttpParams()
      .set("idRegistro", student)
      .set("idReto", challenge)
      .set("preguntas", String(_questions))
      .set("respuestas", String(_answers))
      .set("correctas", String(_corrects))
      .set("tiempo", takedTime);
    return new Promise((resolve, reject) => {
      this.http
        .post(laravelApiUrl + "guardRespEstudts", body.toString(), {
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
