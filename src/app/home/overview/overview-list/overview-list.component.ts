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
  page: number;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.page = 1;
  }

  ngOnInit() {
    this.apiService.reportList('size=10').then(d => {
      this.list = d;
    });
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

}
