import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ApiService } from 'app/util/api.service';
import { DialogComponent } from 'app/util/dialog.component';

@Component({
  selector: 'p-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent implements OnInit {
  list: [any];
  pageSize = 10;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadList();
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

}
