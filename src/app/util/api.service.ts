import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { environment } from 'environments/environment';
import { Headers } from '@angular/http';
import { Base64 } from 'js-base64';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DialogComponent } from './dialog.component';

@Injectable()
export class ApiService {
  private authKey = 'push_auth';
  auth: string;
  private showErrorDialog: boolean;

  constructor(private http: Http, private dialog: MdDialog, private router: Router) {
    this.auth = window.localStorage.getItem(this.authKey);
  }

  encodeAuth(key: string, pwd) {
    let auth = Base64.encode(key + ':' + pwd);
    this.setAuth(auth);
  }

  setAuth(auth) {
    window.localStorage.setItem(this.authKey, auth);
    this.auth = auth;
  }

  login(username, password, isAdmin?) {
    let url = environment.api + '/api/' + (isAdmin ? 'admin' : 'auth') + '/login';
    let auth = Base64.encode((isAdmin ? '' : '/') + username + ':' + password);
    let headers = new Headers();
    headers.set('Authorization', auth);
    return this.http.post(url, null, { headers }).toPromise().then((res) => {
      this.setAuth(auth);
    }).catch(function (e) {
      if (e.status == 404) {
        return Promise.resolve({});
      }
      return Promise.reject({});
    });
  }

  onlineReport(params?) {
    let query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/online' + query);
  }

  nsQueryList() {
    return this.authHttp('/api/admin/namespace/list');
  }

  push(data) {
    return this.authHttp('/api/auth/push', RequestMethod.Post, data);
  }

  pushReport(id, params?) {
    let query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/push/' + id + query);
  }

  reportList(params?) {
    let query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/push' + query);
  }

  saveNamespace(data) {
    return this.authHttp('/api/admin/namespace/save', RequestMethod.Post, data);
  }

  delNamespace(key) {
    return this.authHttp('/api/admin/namespace/del' + key);
  }

  private authHttp(url: string, method?: RequestMethod, data?: any): Promise<any> {
    if (!this.auth) {
      if (!this.showErrorDialog) {
        let dialogRef = this.dialog.open(DialogComponent, { data: { des: '认证参数丢失' } });
        dialogRef.afterClosed().subscribe(function () {
          this.showErrorDialog = false;
        });

        setTimeout(() => {
          dialogRef.close();
        }, 3000);
        this.showErrorDialog = true;
      }
      this.router.navigateByUrl('/welcome');
      return Observable.throw(new Error('valid error')).toPromise();
    }

    url = environment.api + url;
    let headers = new Headers();
    headers.set('Authorization', this.auth);

    if (method === RequestMethod.Post) {
      return this.http.post(url, data, { headers }).map(res => res.json()).toPromise();
    } else {
      return this.http.get(url, { headers }).map(res => res.json()).toPromise();
    }
  }
}
