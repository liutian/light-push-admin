import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from 'app/util/api.service';
import { DialogComponent } from 'app/util/dialog.component';
import { UserService } from 'app/util/user.service';
import 'particles.js';
import { option as particleOption } from 'app/util/particles';

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
    private router: Router) { }

  ngOnInit() {
    window.particlesJS('particles', particleOption);
  }

  login() {
    this.apiService.login(this.username, this.password, this.isAdmin).then(() => {
      const dialogRef = this.dialog.open(DialogComponent, { data: { des: '登录成功' } });
      const userKey = (this.isAdmin ? '' : '/') + this.username;
      this.user.save({
        name: this.username,
        key: userKey,
        password: this.password,
        role: this.isAdmin ? 'admin' : 'user'
      });
      this.apiService.encodeAuth(userKey, this.password);
      setTimeout(() => {
        dialogRef.close();
        if (this.isAdmin) {
          this.router.navigateByUrl('/home/ns-list');
        } else {
          this.router.navigateByUrl('/home');
        }
      }, 1000);
    }).catch(() => {
      const dialogRef = this.dialog.open(DialogComponent, { data: { des: '登录失败' } });
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    })
  }
}
