import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHomeNsListGuard implements CanActivate {
  constructor(private user: UserService, private router: Router, private snackBar: MatSnackBar) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.role === 'admin') {
      return true;
    }
    this.snackBar.open('对不起，你不是管理员');
    this.router.navigateByUrl('/home');
    return false;
  }

}
