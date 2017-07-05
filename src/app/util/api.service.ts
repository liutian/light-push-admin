import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';
import { Headers } from '@angular/http';
import { Base64 } from 'js-base64';
import { MdDialog } from '@angular/material';

import { DialogComponent } from './dialog.component';

@Injectable()
export class ApiService {
  private authKey = 'push_auth';
  auth: string;

  constructor(private http: Http, private dialog: MdDialog) {
    this.auth = window.sessionStorage.getItem(this.authKey);
  }

  encodeAuth(key, pwd) {
    let auth = Base64.encode(key + ':' + pwd);
    this.setAuth(auth);
  }

  setAuth(auth) {
    window.sessionStorage.setItem(this.authKey, auth);
    this.auth = auth;
  }

  login(username, password, isAdmin?) {
    let url = environment.api + '/api/' + (isAdmin ? 'admin' : 'auth') + '/login';
    let auth = Base64.encode((isAdmin ? '' : '/') + username + ':' + password);
    let headers = new Headers();
    headers.set('Authorization', auth);
    return this.http.post(url, null, {
      headers: headers
    }).toPromise().then((res) => {
      this.setAuth(auth);
    }).catch(function (e) {
      if (e.status == 404) {
        return Promise.resolve({});
      }
      return Promise.reject({});
    });
  }

  onlineReport(params?) {
    if (!this.auth) {
      this.dialog.open(DialogComponent, { data: '认证参数丢失' });
      return;
    }

    let url = environment.api + '/api/auth/report/online';
    let headers = new Headers();
    headers.set('Authorization', this.auth);

    let query = params ? '?' + params : '';
    return this.http.get(url + query, {
      headers: headers
    }).toPromise().then(function (res) {
      return res.json();
    })
  }

  nsQueryList() {
    if (!this.auth) {
      this.dialog.open(DialogComponent, { data: '认证参数丢失' });
      return;
    }

    let url = environment.api + '/api/admin/namespace/list';
    let headers = new Headers();
    headers.set('Authorization', this.auth);

    return this.http.get(url, {
      headers: headers
    }).toPromise().then(function (res) {
      return res.json();
    });
  }
}
