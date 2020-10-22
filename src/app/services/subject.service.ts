import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

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
      this.http.get(apiUrl + "GetForosDistributivo/?iddistributivo=" + subject).subscribe(
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
}

