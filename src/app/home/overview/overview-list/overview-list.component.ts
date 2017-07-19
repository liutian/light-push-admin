import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ApiService } from '../../../util/api.service';
import { DialogComponent } from '../../../util/dialog.component';

@Component({
  selector: 'p-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent implements OnInit {
  list: Promise<any[]>;
  page: number;

  constructor(private apiService: ApiService, private dialog: MdDialog) {
    this.page = 1;
  }

  ngOnInit() {
    this.list = this.apiService.reportList('pageSize=100');
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
