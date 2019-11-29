import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHomeGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.role === 'user' || Base64.encode(this.user.name + ':' + this.user.password) !== window.localStorage.getItem('push_auth')) {
      return true;
    }
    if (this.user.role === 'admin') {
      this.router.navigateByUrl('/home/ns-list');
      return false;
    }
    this.router.navigateByUrl('/welcome');
    return false;
  }
}
