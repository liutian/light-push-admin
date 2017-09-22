import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";


@Injectable()
export class SocketService {
  public subject = new Subject<any>();
  public ready = false;
  namespace: string;
  serverUrl: string;
  userid: string;
  uuid: string;
  platform: string;
  option: any;
  private socket: any;
  private scriptPath = '/socket.io/socket.io.js';



  constructor() { }

  connect({ serverUrl, namespace, userid, uuid, scriptPath, platform = 'web', option = {} }) {
    if (this.socket) {
      return;
    }

    this.namespace = namespace;
    this.serverUrl = serverUrl;
    this.userid = userid;
    this.uuid = uuid;
    this.platform = platform;
    this.option = option;

    if (!window.io) {
      window.LazyLoad.js(scriptPath + this.scriptPath, this.initConnect, null, this);
    } else {
      this.initConnect();
    }
  }

  disconnect() {
    this.ready = false;
    if (!this.socket) {
      return
    }

    try {
      this.socket.disconnect();
    } catch (e) {
      console.log('断开连接失败');
    } finally {
      this.socket = undefined;
    }
  }

  joinRoom(rooms: string[], callback?) {
    this.socket.emit('joinRoom', rooms, callback);
  }

  leaveRoom(rooms: string[], callback?) {
    this.socket.emit('leaveRoom', rooms, callback);
  }

  getInfo(callback?) {
    this.socket.emit('info', {}, callback);
  }

  setInfo(data, callback?) {
    this.socket.emit('info', data, callback);
  }

  private initConnect() {
    const url = this.serverUrl + this.namespace + '?userid=' + this.userid + '&uuid=' + this.uuid + '&platform=' + this.platform;
    this.socket = window.io.connect(url, this.option);
    this.initListener();
  }

  private initListener() {
    this.socket.on('connect', () => {
      this.ready = true;
      console.log('连接成功');
    });

    this.socket.on('ok', (data) => {
      console.log('连接就绪:');
      console.dir(data);
    });

    this.socket.on('push', (data) => {
      this.subject.next(data);
    });

    this.socket.on('connect_error', () => {
      console.log('连接异常，请检查你的网络');
      this.disconnect();
    });

    this.socket.on('connect_timeout', () => {
      console.log('连接超时，请重试');
      this.disconnect();
    });

    this.socket.on('reconnect_failed', () => {
      console.log('重新连接失败');
      this.disconnect();
    });

    this.socket.on('reconnect', () => {
      console.log('重新连接成功');
    });

    this.socket.on('peopleJoin', (data) => {
      console.log('上线广播：');
      console.dir(data);
    });

    this.socket.on('peopleLeave', (data) => {
      console.log('下线广播：');
      console.dir(data);
    });
  }
}
