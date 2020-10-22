import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl } from "src/environments/environment";

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
}
