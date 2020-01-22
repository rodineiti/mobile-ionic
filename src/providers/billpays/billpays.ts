import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import constants from "../../constants";

let server_url = constants.API_URL;

/*
  Generated class for the BillpaysProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BillpaysProvider {
  protected headers: Headers;

  constructor(public http: Http) {
    console.log("Hello BillpaysProvider Provider");
    this.setAccessToken();
  }

  setAccessToken() {
    let token = JSON.parse(localStorage.getItem("currentUser"));
    this.headers = new Headers({
      Authorization: "Bearer " + token.access_token,
      Accept: "application/json"
    });
  }

  index() {
    return new Promise((resolve, reject) => {
      this.http
        .get(server_url + "/api/v1/bill_pays", { headers: this.headers })
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

  store(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(server_url + "/api/v1/bill_pays/store", data, {
          headers: this.headers
        })
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

  show(id) {
    return new Promise((resolve, reject) => {
      this.http
        .get(server_url + "/api/v1/bill_pays/show/" + id, {
          headers: this.headers
        })
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

  update(data, id) {
    return new Promise((resolve, reject) => {
      this.http
        .put(server_url + "/api/v1/bill_pays/update/" + id, data, {
          headers: this.headers
        })
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

  destroy(id) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(server_url + "/api/v1/bill_pays/destroy/" + id, {
          headers: this.headers
        })
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
