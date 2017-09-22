import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private itemKey = 'user_info';
  name: string;
  role: string;
  key: string;
  password: string;
  namespace: string;

  constructor() {
    let str = window.localStorage.getItem(this.itemKey);
    if (!str) return;

    try {
      let userInfo = JSON.parse(str);
      this.name = userInfo.name;
      this.role = userInfo.role;
      this.key = userInfo.key;
      this.password = userInfo.password;
      this.namespace = userInfo.namespace;
    } catch (e) { }
  }

  save(data) {
    let d: any = {
      name: this.name,
      role: this.role,
      key: this.key,
      password: this.password,
      namespace: this.namespace
    };
    data.name !== undefined && (d.name = this.name = data.name);
    data.key !== undefined && (d.key = this.key = data.key);
    data.password !== undefined && (d.password = this.password = data.password);
    data.role !== undefined && (d.role = this.role = data.role);
    data.namespace !== undefined && (d.namespace = this.namespace = data.namespace);
    window.localStorage.setItem(this.itemKey, JSON.stringify(d));
  }
}
