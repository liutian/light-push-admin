import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../util/api.service';
import { DialogComponent } from '../util/dialog.component';
import { UserService } from '../util/user.service';

@Component({
  selector: 'p-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  username: string;
  password: string;
  isAdmin: boolean;

  constructor(private api: ApiService,
    private dialog: MdDialog,
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.api.login(this.username, this.password, this.isAdmin).then(() => {
      let dialogRef = this.dialog.open(DialogComponent, { data: '登录成功' });
      this.user.name = this.username;
      this.user.key = this.username;
      this.user.password = this.password;
      this.user.role = this.isAdmin ? 'admin' : 'user';
      setTimeout(() => {
        dialogRef.close();
        if (this.isAdmin) {
          this.router.navigate(['home/ns-list']);
        } else {
          this.router.navigate(['home']);
        }
      }, 1000);
    }).catch(() => {
      let dialogRef = this.dialog.open(DialogComponent, { data: '登录失败' });
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    })
  }
}
