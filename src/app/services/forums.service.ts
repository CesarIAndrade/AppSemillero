import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { apiUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ForumsService {
  constructor(private http: HttpClient) {}

  getForums(id) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "Foros/" + id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  createForum(topic, subTopic, limitDate, creatorId) {
    const body = new HttpParams()
      .set("tema", topic)
      .set("subtema", subTopic)
      .set("fechaCierre", limitDate)
      .set("idCreador", creatorId);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "Foros", body.toString(), {
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

  like(forumId, id) {
    const body = new HttpParams().set("idForo", forumId).set("idRegistro", id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "DarLike", body.toString(), {
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

  dislike(forumId, id) {
    const body = new HttpParams().set("idForo", forumId).set("idRegistro", id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "QuitarLike", body.toString(), {
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

  getForumComments(forumId) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "Comentarios/" + forumId).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  commentInForum(comment, forumId, id) {
    const body = new HttpParams()
      .set("descripcion", comment)
      .set("idForo", forumId)
      .set("idRegistro", id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + "ComentarioForo", body.toString(), {
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
