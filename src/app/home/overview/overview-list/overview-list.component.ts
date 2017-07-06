import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../util/api.service';

@Component({
  selector: 'p-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent implements OnInit {
  list: Promise<any[]>;
  page: number;

  constructor(private apiService: ApiService) {
    this.page = 1;
  }

  ngOnInit() {
    this.list = this.apiService.reportList('pageSize=100');
  }

}
