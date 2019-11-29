import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DialogComponent } from './dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiService {
  auth: string;
  private authKey = 'push_auth';
  private showErrorDialog: boolean;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
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

  login(params): Promise<any> {
    const url = '/api/' + (params.isAdmin ? 'admin' : 'auth') + '/login';
    const auth = Base64.encode((params.isAdmin ? '' : '/') + params.username + ':' + params.password);
    const headers = new HttpHeaders({
      Authorization: auth
    });
    const clientPromise = this.http.post(url, null, { headers }).toPromise();
    const _promise = this.wrapClientPromise(clientPromise, {
      setAuth: true,
      auth: auth,
      _noEmitOnError: params._noEmitOnError
    });

    this.wrapCatch(_promise);

    return _promise;
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

  pushReport(id, params?, data?) {
    const query = params ? '?' + params : '';

    return this.authHttp('/api/auth/report/push/' + id + query, 'Get', data);
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

    let clientPromise;
    if (method === 'Post') {
      clientPromise = this.http.post(url, data, { headers }).toPromise();
    } else {
      clientPromise = this.http.get(url, { headers }).toPromise();
    }

    const _promise = this.wrapClientPromise(clientPromise, data);

    this.wrapCatch(_promise);

    return _promise;
  }

  private wrapClientPromise(clientPromise, params) {
    params = params || {
      _noEmitOnError: false
    };
    const _promise = clientPromise.then((res) => {
      if (params.setAuth) {
        this.setAuth(params.auth);
      }
      // if (res.error) {
      //   let notice = '';
      //   if (res.error.code === 9999) {
      //     notice = res.error.msg;
      //   }
      //   res._notice = notice;
      //   return Promise.reject(res);
      // }
      return res;
    }).catch(e => {
      // 根据_noEmitOnError判断是否需要自动弹出提示异常信息
      if (params._noEmitOnError !== true && e._notice) {
        this.snackBar.open(e._notice);
      }
      return Promise.reject(e);
    });

    return _promise;
  }

  private wrapCatch(_promise) {
    const _then = _promise.then;
    let _reject, __p;
    const _rejectFn = (e) => {
      if (_reject) {
        _reject.call(__p, e);
      }
      // 屏蔽http响应异常,状态码为0,且发请求的Promise没有catch错误
    };
    _promise.then = (resolve, reject) => {
      __p = _promise;
      _reject = reject;
      const _p = _then.call(_promise, resolve, _rejectFn);
      _p.catch = (r) => {
        __p = _p;
        _reject = r;
        return _p;
      };
      return _p;
    };
  }

}
