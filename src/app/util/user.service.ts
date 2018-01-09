import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private itemKey = 'user_info';
  name: string;
  role: string;
  key: string;
  password: string;
  namespace: string;
  nsName: string;

  constructor() {
    const str = window.localStorage.getItem(this.itemKey);
    if (!str) {
      return;
    }

    try {
      const userInfo = JSON.parse(str);
      this.name = userInfo.name;
      this.role = userInfo.role;
      this.key = userInfo.key;
      this.password = userInfo.password;
      this.namespace = userInfo.namespace;
      this.nsName = userInfo.nsName;
    } catch (e) { }
  }

  save(data) {
    if (data.name !== undefined) {
      this.name = data.name
    }
    if (data.key !== undefined) {
      this.key = data.key
    }
    if (data.password !== undefined) {
      this.password = data.password
    }
    if (data.role !== undefined) {
      this.role = data.role
    }
    if (data.namespace !== undefined) {
      this.namespace = data.namespace
    }
    if (data.nsName !== undefined) {
      this.nsName = data.nsName
    }
    if (data.name !== undefined) {
      this.name = data.name
    }
    window.localStorage.setItem(this.itemKey, JSON.stringify(this));
  }
}
