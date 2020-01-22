import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

import constants from "../../constants";

let server_url = constants.API_URL;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  constructor(public http: Http) {
    console.log("Hello AuthServiceProvider Provider");
  }

  login(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http
        .post(server_url + "/oauth/token", data, { headers: headers })
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http
        .post(server_url + "/api/v1/auth/register", data, { headers: headers })
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  logout() {
    localStorage.removeItem("currentUser");
  }
}
