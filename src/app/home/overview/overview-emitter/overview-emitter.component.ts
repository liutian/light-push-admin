import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { ApiService } from 'app/util/api.service';
import { SocketService } from 'app/util/socket.service';
import { environment } from 'environments/environment';
import { UserService } from 'app/util/user.service';
import { DialogComponent } from 'app/util/dialog.component';

@Component({
  selector: 'p-overview-emitter',
  templateUrl: './overview-emitter.component.html',
  styleUrls: ['./overview-emitter.component.scss']
})
export class OverviewEmitterComponent implements OnInit {
  messageForm: any;
  reportMessage: any;
  reportMessageId: any;
  currTab: string;
  sendId: any;
  simulateForm: any = {};
  messageList = [];
  pushMessageSubscription: Subscription;
  roomSet = new Set();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public socketService: SocketService) {
    this.messageForm = {
      pushData: '{}',
      leaveMessage: true
    };
    this.currTab = 'push';
    this.simulateForm = {};
  }

  ngOnInit() {
  }

  sendMessage() {
    const data = Object.assign({}, this.messageForm);
    if (data.lost) {
      data.extra = 'lost';
      data.lost = undefined;
    }
    try {
      data.pushData = JSON.parse(this.messageForm.pushData);
    } catch (e) {
      this.snackBar.open('必须是JSON字符串', null, { duration: 3000 });
      return;
    }
    this.apiService.push(data).then(res => {
      this.snackBar.open(`消息推送成功 id: ${res.id}`, null, { duration: 3000 });
      this.sendId = res.id;
    });
  }

  toggleToReport(messageId) {
    this.currTab = 'report';
    this.reportMessageId = this.sendId;
    this.report();
  }

  report() {
    this.apiService.pushReport(this.reportMessageId, 'detail=true').then(data => {
      this.reportMessage = JSON.stringify(data, null, '    ');
    });
  }

  connect() {
    this.socketService.connect({
      serverUrl: environment.pushServer,
      namespace: this.userService.namespace,
      userid: this.simulateForm.userid,
      uuid: this.simulateForm.uuid,
      platform: (this.simulateForm.platform || undefined),
      scriptPath: environment.pushScirpt,
      option: {
        path: environment.pushOptionPath
      }
    });
    this.initConnect();
  }

  initConnect() {
    if (this.pushMessageSubscription) {
      this.pushMessageSubscription.unsubscribe();
    }

    this.messageList = [];
    this.simulateForm.joinRooms = 'test1,test2';
    this.simulateForm.leaveRooms = 'test1,test2';
    this.simulateForm.clientInfo = '{}';
    this.pushMessageSubscription = this.socketService.subject.subscribe(msg => {
      this.messageList.push(msg);
    });
  }

  showMessage(msg) {
    this.dialog.open(DialogComponent, { data: { des: JSON.stringify(msg) } });
  }

  disconnect() {
    this.socketService.disconnect();
  }

  joinRoom() {
    this.simulateForm.joinRooms.split(',').forEach(r => {
      this.roomSet.add(r);
    });
    this.socketService.joinRoom(this.simulateForm.joinRooms.split(','), (res) => {
      if (res.status !== 200) {
        const dialogRef = this.dialog.open(DialogComponent, { data: { des: '操作失败' } });
        setTimeout(() => {
          dialogRef.close();
        }, 1000);
      }
    });
  }

  leaveRoom() {
    this.simulateForm.leaveRooms.split(',').forEach(r => {
      this.roomSet.delete(r);
    });
    this.socketService.leaveRoom(this.simulateForm.leaveRooms.split(','), (res) => {
      if (res.status !== 200) {
        const dialogRef = this.dialog.open(DialogComponent, { data: { des: '操作失败' } });
        setTimeout(() => {
          dialogRef.close();
        }, 1000);
      }
    });
  }

  getClientInfo() {
    this.socketService.getInfo((data) => {
      this.dialog.open(DialogComponent, { data: { des: JSON.stringify(data) } });
    });
  }

  setClientInfo() {
    let clientInfo;

    try {
      clientInfo = JSON.parse(this.simulateForm.clientInfo);

      this.socketService.setInfo(JSON.parse(this.simulateForm.clientInfo), (res) => {
        if (res.status !== 200) {
          const dialogRef = this.dialog.open(DialogComponent, { data: { des: '操作失败' } });
          setTimeout(() => {
            dialogRef.close();
          }, 1000);
        }
      });
    } catch (e) {
      const dialogRef = this.dialog.open(DialogComponent, { data: { des: '数据格式有误' } });
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    }


  }

}
