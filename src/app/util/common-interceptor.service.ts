import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { environment } from 'environments/environment';
import { DialogComponent } from 'app/util/dialog.component';

@Injectable()
export class CommonInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _req = req.clone({ withCredentials: true });

    if (_req.url.indexOf('//') === -1) {
      _req = _req.clone({ url: environment.apiPath + _req.url });
    }

    return next.handle(_req).pipe(
      catchError(resError => {
        let notice = '';
        if (resError.status === 401) {
          notice = '会话超时';
          this.router.navigateByUrl('/welcome/login');
        } else if (resError.status !== 400) {
          notice = '网络异常';
        }

        if (notice) {
          const dialogRef = this.dialog.open(DialogComponent, {
            data: { des: notice }
          });
          setTimeout(() => {
            dialogRef.close();
          }, 1500);
        }

        return Observable.throw(resError);
      })
    );
  }
}
