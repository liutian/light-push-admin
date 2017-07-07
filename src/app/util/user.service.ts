import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private itemKey = 'user_info';
  name: string;
  role: string;
  key: string;
  password: string;

  constructor() {
    let str = window.localStorage.getItem(this.itemKey);
    if (!str) return;

    try {
      let userInfo = JSON.parse(str);
      this.name = userInfo.name;
      this.role = userInfo.role;
      this.key = userInfo.key;
      this.password = userInfo.password;
    } catch (e) { }
  }

  save(data) {
    let d: any = {};
    d.name = this.name = data.name;
    d.key = this.key = data.key;
    d.password = this.password = data.password;
    d.role = this.role = data.role;
    window.localStorage.setItem(this.itemKey, JSON.stringify(d));
  }
}
