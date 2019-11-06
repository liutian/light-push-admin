import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from 'app/util/api.service';

@Component({
  selector: 'p-online-report-detail',
  templateUrl: './online-report-detail.component.html',
  styleUrls: ['./online-report-detail.component.css']
})
export class OnlineReportDetailComponent implements OnInit {

  tableData: any = {};

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public room: String,
    private apiService: ApiService) { }

  ngOnInit() {
    const query = 'detail=true' + (this.room ? '&room=' + this.room : '');
    this.apiService.onlineReport(query).then((data) => {
      this.tableData = data;
      if (this.room) {
        this.tableData = data[0];
      }
    });
  }

}
