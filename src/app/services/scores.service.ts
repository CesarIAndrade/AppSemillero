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

  getCurrentSubjects(document) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + `GetMaterias/${document}`, {
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

  getCAAIScores(studentId) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + `NotasCai/${studentId}`, {
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

  getCIScores(document) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + `NotasCi/${document}`, {
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
