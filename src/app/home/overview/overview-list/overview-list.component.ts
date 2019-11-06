import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'app/util/api.service';
import { DialogComponent } from 'app/util/dialog.component';
import { HomeComponent } from 'app/home/home.component';

@Component({
  selector: 'p-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent implements OnInit, OnDestroy {
  list: [any];
  pageSize = 10;
  messageStat: any = {};
  loadTimeout: any;

  constructor(
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

  loadList() {
    this.apiService.reportList(`size=${this.pageSize}`).then(d => {
      this.list = d;
    });
  }

  loadCurrentMessageStat() {
    this.apiService.currentMessageStat().then(data => {
      this.messageStat = data;
      this.loadTimeout = window.setTimeout(this.loadCurrentMessageStat.bind(this), 5000);
    })
  }

  ngOnDestroy(): void {
    this.parent.$showNsName.next(false);
    if (this.loadTimeout) {
      window.clearTimeout(this.loadTimeout);
    }
  }

}
