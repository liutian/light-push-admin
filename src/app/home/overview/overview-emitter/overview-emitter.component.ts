import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { ApiService } from '../../../util/api.service';

@Component({
  selector: 'p-overview-emitter',
  templateUrl: './overview-emitter.component.html',
  styleUrls: ['./overview-emitter.component.scss']
})
export class OverviewEmitterComponent implements OnInit {
  leaveMessage: boolean;
  messageForm: any;
  reportMessage: any;
  reportMessageId: any;
  currTab: string;
  sendId: any;

  constructor(private apiService: ApiService, private snackBar: MdSnackBar) {
    this.leaveMessage = true;
    this.messageForm = {
      pushData: '{}',
      leaveMessage: true
    };
    this.currTab = 'push';
  }

  ngOnInit() {
  }

  sendMessage() {
    let data = Object.assign({}, this.messageForm);
    data.pushData = JSON.parse(this.messageForm.pushData);
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

}
