import { Component, OnInit } from '@angular/core';
import { ApiService } from '../util/api.service';

@Component({
  selector: 'p-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  username: string;
  password: string;
  isAdmin: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  login() {
    this.api.login(this.username, this.password, this.isAdmin).then(function () {
      alert('登录成功');
    }).catch(function (e) {
      alert('登录失败');
    })
  }
}
