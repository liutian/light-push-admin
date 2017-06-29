import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';
import { Headers } from '@angular/http';
import { Base64 } from 'js-base64';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  login(username, password, isAdmin?) {
    let url = environment.api + '/login';
    let headers = new Headers();
    let auth = Base64.encode((isAdmin ? '' : '/') + username + ':' + password);
    headers.set('Authorization', auth);
    return this.http.post(url, null, {
      headers: headers
    }).toPromise().then(function (res) {
      console.dir(res);
    }).catch(function (e) {
      if (e.status == 404) {
        return Promise.resolve({});
      }
      return Promise.reject({});
    });
  }
}
