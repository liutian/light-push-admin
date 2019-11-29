import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DialogComponent } from './dialog.component';


@Injectable()
export class CommonInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _req = req.clone({ withCredentials: true });

    if (_req.url.indexOf('//') === -1) {
      _req = _req.clone({ url: environment.apiPath + _req.url });
    }

    return next.handle(_req).pipe(
      catchError((e: HttpErrorResponse, caught: Observable<any>): ObservableInput<any> => {
        let notice = '';
        if (e.status === 400) {
          notice = '参数错误';
        } else if (e.status === 401) {
          notice = '会话超时';
          this.router.navigateByUrl('/welcome/login');
        } else if (e.status !== 400) {
          notice = '网络异常';
        }
        (<any>e)._notice = notice;
        // if (notice) {
        //   // const dialogRef = this.dialog.open(DialogComponent, {
        //   //   data: { des: notice }
        //   // });
        //   // setTimeout(() => {
        //   //   dialogRef.close();
        //   // }, 1500);
        //   this.snackBar.open(notice);
        // }

        return throwError(e);
      }), tap((e) => {

      })
    );
  }
}
