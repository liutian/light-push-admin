import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DialogComponent } from './dialog.component';

@Injectable()
export class ApiService {
  auth: string;
  private authKey = 'push_auth';
  private showErrorDialog: boolean;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {
    this.auth = window.localStorage.getItem(this.authKey);
  }

  encodeAuth(key: string, pwd) {
    const auth = Base64.encode(key + ':' + pwd);
    this.setAuth(auth);
  }

  setAuth(auth) {
    window.localStorage.setItem(this.authKey, auth);
    this.auth = auth;
  }

  login(username, password, isAdmin?) {
    const url = '/api/' + (isAdmin ? 'admin' : 'auth') + '/login';
    const auth = Base64.encode((isAdmin ? '' : '/') + username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: auth
    });
    return this.http.post(url, null, { headers }).toPromise().then((res) => {
      this.setAuth(auth);
    }).catch(function (e) {
      if (e.status === 404) {
        return Promise.resolve({});
      }
      return Promise.reject({});
    });
  }

  onlineReport(params?) {
    const query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/online' + query);
  }

  onlineReportAdmin(params?) {
    const query = params ? '?' + params : '';

    return this.authHttp('/api/admin/report/online' + query);
  }

  nsQueryList(params?) {
    params = Object.keys(params || {}).map(k => `${k}=${params[k]}`).join('&');
    const query = params ? '?' + params : '';
    return this.authHttp('/api/admin/namespace/list' + query);
  }

  push(data) {
    return this.authHttp('/api/auth/push', 'Post', data);
  }

  pushReport(id, params?) {
    const query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/push/' + id + query);
  }

  reportList(params?) {
    const query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/push' + query);
  }

  saveNamespace(data) {
    return this.authHttp('/api/admin/namespace/save', 'Post', data);
  }

  clearRealTimeData(data) {
    return this.authHttp('/api/admin/namespace/clear-realtime-data', 'Post', data);
  }

  clearLegacyClient(data) {
    return this.authHttp('/api/admin/clear-legacy-client', 'Post', data);
  }

  clearNamespace(key) {
    return this.authHttp('/api/admin/namespace/clear' + key);
  }

  flushNamespace(key) {
    return this.authHttp('/api/admin/namespace/flush' + key);
  }

  currentMessageStat() {
    return this.authHttp('/api/auth/namespace/current-message-stat');
  }

  private authHttp(url: string, method?: string, data?: any): Promise<any> {
    if (!this.auth) {
      if (!this.showErrorDialog) {
        const dialogRef = this.dialog.open(DialogComponent, { data: { des: '认证参数丢失' } });
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

    const headers = new HttpHeaders({
      Authorization: this.auth
    });

    if (method === 'Post') {
      return this.http.post(url, data, { headers }).toPromise();
    } else {
      return this.http.get(url, { headers }).toPromise();
    }
  }


}
