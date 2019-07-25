import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

let server_url = 'http://localhost:8000';

/*
  Generated class for the CategoriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesServiceProvider {

  protected headers: Headers;

  constructor(public http: Http) {
    console.log('Hello CategoriesServiceProvider Provider');
    this.setAccessToken();
  }

  setAccessToken () {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({'Authorization': 'Bearer ' + token.access_token, 'Accept': 'application/json'});
  }

  index() {
    return new Promise((resolve, reject) => {
      this.http.get(server_url+'/api/v1/categories',{ headers: this.headers }).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    })
  }

  store(data) {
    return new Promise((resolve, reject) => {
      this.http.post(server_url+'/api/v1/categories/store', (data), { headers: this.headers }).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    })
  }

  show(id) {
    return new Promise((resolve, reject) => {
      this.http.get(server_url+'/api/v1/categories/show/' + id, { headers: this.headers }).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    })
  }

  update(data, id) {
    return new Promise((resolve, reject) => {
      this.http.put(server_url+'/api/v1/categories/update/' + id, (data), { headers: this.headers }).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    })
  }

  destroy(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(server_url+'/api/v1/categories/destroy/' + id, { headers: this.headers }).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    })
  }

}
