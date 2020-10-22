import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { apiUrl } from "src/environments/environment";
// import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // hubConnection: signalR.HubConnection;

  login(username: string, password: string) {
    const body = new HttpParams()
      .set("cedula", username)
      .set("clave", password)
      .set("token", "token");
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'Login', body.toString(), {
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

  // createConnection() {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .configureLogging(signalR.LogLevel.Debug)
  //     .withUrl(realTimeApiUrl + "ChatHub?user=Cesar", {
  //       skipNegotiation: true,
  //       transport: signalR.HttpTransportType.WebSockets,
  //     })
  //     .build();
  //   this.hubConnection
  //     .start()
  //     .then(() => {})
  //     .catch((err) => {
  //       console.log("Error while establishing connection :(");
  //     });
  //   this.hubConnection.on("nuevoInicio", (mensaje: string) => {
  //     console.log("mensaje", mensaje);
  //   });
  // }
}
