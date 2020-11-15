import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { laravelApiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WwtbmService {
  constructor(private http: HttpClient) {}

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
      console.log(body);
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
