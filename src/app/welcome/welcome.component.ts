import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from 'app/util/api.service';
import { DialogComponent } from 'app/util/dialog.component';
import { UserService } from 'app/util/user.service';

import { option as particleOption } from 'app/util/particles';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'p-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  username: string;
  password: string;
  isAdmin: boolean;

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private user: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    window.particlesJS('particles', particleOption);
    this.onChangeUser();
  }

  login() {
    this.apiService.login({ username: this.username, password: this.password, isAdmin: this.isAdmin, ...{ _noEmitOnError: true } }).then(() => {
      this.snackBar.open('登录成功');
      // const dialogRef = this.dialog.open(DialogComponent, { data: { des: '登录成功' } });
      const userKey = (this.isAdmin ? '' : '/') + this.username;
      const userInfo: any = {
        key: userKey,
        name: this.username,
        password: this.password,
        role: this.isAdmin ? 'admin' : 'user'
      };

      if (!this.isAdmin) {
        userInfo.namespace = '/' + this.username;
        userInfo.nsName = this.username;
      }

      this.user.save(userInfo);
      this.apiService.encodeAuth(userKey, this.password);
      setTimeout(() => {
        // dialogRef.close();
        if (this.isAdmin) {
          this.router.navigateByUrl('/home/ns-list');
        } else {
          this.router.navigateByUrl('/home');
        }
      }, 1000);
    }).catch(() => {
      // const dialogRef = this.dialog.open(DialogComponent, { data: { des: '登录失败' } });
      // setTimeout(() => {
      //   dialogRef.close();
      // }, 1500);
      this.snackBar.open('登录失败');
    });
  }

  onChangeUser() {
    if (this.username === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
