import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

import constants from "../../constants";

let server_url = constants.API_URL;

/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider {
  protected headers: Headers;

  constructor(public http: Http) {
    console.log("Hello ReportProvider Provider");
    this.setAccessToken();
  }

  setAccessToken() {
    let token = JSON.parse(localStorage.getItem("currentUser"));
    this.headers = new Headers({
      Authorization: "Bearer " + token.access_token,
      Accept: "application/json"
    });
  }

  sumChartsByPeriod(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(server_url + "/api/v1/charts", data, { headers: this.headers })
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
}
