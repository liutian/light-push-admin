import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { ApiService } from 'app/util/api.service';
import { DialogComponent } from 'app/util/dialog.component';
import { UserService } from 'app/util/user.service';
import * as moment from 'moment';


@Component({
  selector: 'p-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss'],
})
export class OverviewListComponent implements OnInit, OnDestroy {
  sendDateControl = new FormControl(moment());
  list: [any];
  pageSize = 100000000;
  messageStat: any = {};
  loadTimeout: any;
  currentList: any[];
  pageEvent: PageEvent;
  queryParams: any = {
    room: '',
    leaveMessage: '',
    apnsName: '',
  };

  constructor(
    private router: Router,
    private user: UserService,
    private parent: HomeComponent,
    private apiService: ApiService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    window.setTimeout(() => {
      this.parent.$showNsName.next(true);
    }, 0);
    this.loadList();
    this.loadCurrentMessageStat();
  }

  showMorePushData(data) {
    let jsonData = data;
    try {
      jsonData = JSON.parse(data);
      jsonData = JSON.stringify(jsonData, null, 4);
    } catch (e) {
      jsonData = data;
    }
    this.dialog.open(DialogComponent, { data: { des: jsonData, pre: true } }).updateSize();
  }

  loadList(params?, e?) {
    const pageInfo = {
      start: e ? (e.pageIndex * e.pageSize) : 0,
      end: e ? ((e.pageIndex + 1) * e.pageSize) : 10,
    };
    this.apiService.reportList(`size=${this.pageSize}`).then(res => {
      const resList = res || [];
      this.list = resList.filter(item => {
        if (!params) {
          return item;
        } else {
          item.room = item.room || '';
          item.sendDate = item.sendDate * 1;
          item.leaveMessage = item.leaveMessage || '';
          item.apnsName = item.apnsName || '';
          const queryParams = JSON.parse(JSON.stringify(params));
          if (queryParams.sendDateStart) {
            queryParams.sendDateStart = this.formateSearchDate('sendDateStart', queryParams.sendDateStart);
          } else {
            queryParams.sendDateStart = this.formateSearchDate('sendDateStart', new Date('1970-01-01'));
          }
          if (queryParams.sendDateEnd) {
            queryParams.sendDateEnd = this.formateSearchDate('sendDateEnd', queryParams.sendDateEnd);
          } else {
            let dateTime = new Date();
            dateTime = new Date(dateTime.setDate(dateTime.getDate() + 1));
            queryParams.sendDateEnd = this.formateSearchDate('sendDateEnd', dateTime);
          }

          // tslint:disable-next-line:max-line-length
          return item.room.includes(queryParams.room) && item.apnsName.includes(queryParams.apnsName) && item.leaveMessage.includes(queryParams.leaveMessage) && (item.sendDate >= queryParams.sendDateStart) && (item.sendDate <= queryParams.sendDateEnd);
        }
      }) || [];
      this.currentList = this.list.slice(pageInfo.start, pageInfo.end);
    });
  }

  formateSearchDate(type: string, event: Date) {
    let date = moment(<any>event).format('YYYY-MM-DD');
    if (type === 'sendDateStart') {
      date += ' 00:00:00';
    } else if (type === 'sendDateEnd') {
      date += ' 23:59:59';
    } else {
      date += moment(Date.now()).format('HH:mm:ss');
    }
    return new Date(date).getTime();
  }

  loadCurrentMessageStat() {
    this.apiService.currentMessageStat().then(data => {
      this.messageStat = data;
      this.loadTimeout = window.setTimeout(this.loadCurrentMessageStat.bind(this), 5000);
    });
  }


  ngOnDestroy(): void {
    this.parent.$showNsName.next(false);
    if (this.loadTimeout) {
      window.clearTimeout(this.loadTimeout);
    }
  }

}
