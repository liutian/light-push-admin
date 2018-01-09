import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog } from '@angular/material';

import { ApiService } from 'app/util/api.service';
import { ChartOption } from './chart-option';
import { DialogInputComponent } from 'app/util/dialog-input.component';
import { OnlineReportDetailComponent } from 'app/util/online-report-detail/online-report-detail.component';

@Component({
  selector: 'p-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent implements OnInit, OnDestroy {
  optionObservable: any;
  optionObserver: any;
  chartOptionOverview: any;
  roomList: any[];
  activeTab: string;
  currChartType: string;
  private chartOption: any;
  private fetchTimeout: number;

  constructor(private apiService: ApiService,
    private dialog: MatDialog) {
    this.roomList = [];
    this.currChartType = 'line';
  }

  ngOnInit() {
    this.optionObservable = Observable.create(o => {
      this.optionObserver = o;
      this.chartOptionOverview = ChartOption.createOverviewOpton();
      this.fillOverviewOption(this.chartOptionOverview);
      this.toggleChartView();
      this.fetchData();
    });
  }

  showDetail() {
    this.dialog.open(OnlineReportDetailComponent, { data: this.activeTab }).updateSize();
  }

  toggleChartView(roomName?) {
    if (roomName) {
      const room = this.roomList.find(v => v.name === roomName);
      if (!room) {
        return;
      }

      this.chartOption = room.chartLineOption;
    } else {
      this.chartOption = this.chartOptionOverview;
    }
    this.activeTab = roomName;
    this.currChartType = 'line';
    this.optionObserver.next({ option: this.chartOption, clear: true });
  }

  toggleChartType(type) {
    this.currChartType = type;
    const room = this.roomList.find(v => v.name === this.activeTab);
    if (type === 'line') {
      this.chartOption = room.chartLineOption;
    } else {
      this.chartOption = room.chartPieOption;
    }
    this.optionObserver.next({ option: this.chartOption, clear: true });
  }

  showAddRoom() {
    const dialogRef = this.dialog.open(DialogInputComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === -1 || result === undefined) {
        return;
      }

      if (!result || !result.trim()) {
        alert('请填写房间名');
      } else {
        this.addRoom(result.trim());
      }
    });
  }

  addRoom(roomName) {
    let room = this.roomList.find(v => v.name === roomName);

    if (!room) {
      room = {
        name: roomName,
        chartLineOption: ChartOption.createRoomLineOption(),
        chartPieOption: ChartOption.createRoomPieOption()
      }

      this.fillRoomLineOption(room.chartLineOption);
      this.roomList.push(room);
    }

    this.chartOption = room.chartLineOption;

    this.toggleChartView(roomName);
  }

  removeRoom(roomName) {
    const index = this.roomList.findIndex(v => v.name === roomName);
    this.roomList.splice(index, 1);
    this.currChartType = 'line';
    if (index === 0 || this.roomList.length === 0) {
      this.chartOption = this.chartOptionOverview;
      this.activeTab = '';
    } else {
      const room = this.roomList[index] || this.roomList[index - 1]
      this.chartOption = room.chartLineOption;
      this.activeTab = room.name;
    }
    this.optionObserver.next({ option: this.chartOption, clear: true });
  }


  fillOverviewOption(chartOption) {
    const now = Date.now();
    const userSeriesData = chartOption.series[0].data;
    const roomSeriesData = chartOption.series[1].data;
    const clientSeriesData = chartOption.series[2].data;
    const xAxis = chartOption.xAxis.data;


    for (let i = 0; i < 100; i++) {
      const time = new Date(now - 5000 * (i + 1));
      xAxis.unshift(this.toTime(time));
      userSeriesData.unshift(null);
      roomSeriesData.unshift(null);
      clientSeriesData.unshift(null);
    }
  }

  fillRoomLineOption(chartOption) {
    const now = Date.now();
    const userSeriesData = chartOption.series[0].data;
    const clientSeriesData = chartOption.series[1].data;
    const xAxis = chartOption.xAxis.data;

    for (let i = 0; i < 100; i++) {
      const time = new Date(now - 5000 * (i + 1));
      xAxis.unshift(this.toTime(time));
      userSeriesData.unshift(null);
      clientSeriesData.unshift(null);
    }
  }

  fetchData() {
    Promise.all([this.fetchOverviewOnlineData(), this.fetchRoomOnlineData()]).then(() => {
      this.optionObserver.next({ option: this.chartOption });

      this.fetchTimeout = window.setTimeout(() => {
        this.fetchData();
      }, 5000);
    })
  }

  fetchRoomOnlineData() {
    if (this.roomList.length === 0) {
      return Promise.resolve();
    }

    const firstRoomName = (this.roomList[0] || {}).name;
    const roomNameListParams = this.roomList.map(v => 'room=' + v.name).join('&');
    return this.apiService.onlineReport(roomNameListParams).then(data => {
      if (!Array.isArray(data)) {
        data = [Object.assign(data, { name: firstRoomName })];
      }

      data.forEach(value => {
        const room = this.roomList.find(v => v.name === value.name);
        if (!room) {
          return;
        }

        const now = new Date();
        const limit = 1000;
        const xAxisData = room.chartLineOption.xAxis.data;
        const userSeriesData = room.chartLineOption.series[0].data;
        const clientSeriesData = room.chartLineOption.series[1].data;

        if (xAxisData.length > limit) {
          xAxisData.shift();
        }
        xAxisData.push(this.toTime(now));

        if (userSeriesData.length > limit) {
          userSeriesData.shift();
        }
        userSeriesData.push(value.userCount);

        if (clientSeriesData.length > limit) {
          clientSeriesData.shift();
        }
        clientSeriesData.push(value.clientCount);

        const webTotalCount = room.chartPieOption.series[0].data[0].value =
          value.totalClientCount - value.totalIOSClientCount - value.totalAndroidClientCount;
        room.chartPieOption.series[0].data[1].value = value.totalIOSClientCount;
        room.chartPieOption.series[0].data[2].value = value.totalAndroidClientCount;

        const webCount = room.chartPieOption.series[1].data[0].value = value.clientCount - value.androidClientCount - value.iosClientCount;
        room.chartPieOption.series[1].data[1].value = webTotalCount - webCount;
        room.chartPieOption.series[1].data[2].value = value.iosClientCount;
        room.chartPieOption.series[1].data[3].value = value.totalIOSClientCount;
        room.chartPieOption.series[1].data[4].value = value.androidClientCount;
        room.chartPieOption.series[1].data[5].value = value.totalAndroidClientCount;
      });
    });
  }

  fetchOverviewOnlineData() {
    return this.apiService.onlineReport().then(data => {
      const now = new Date();
      const limit = 1000;
      const xAxisData = this.chartOptionOverview.xAxis.data;
      const userSeriesData = this.chartOptionOverview.series[0].data;
      const roomSeriesData = this.chartOptionOverview.series[1].data;
      const clientSeriesData = this.chartOptionOverview.series[2].data;

      if (xAxisData.length > limit) {
        xAxisData.shift();
      }
      xAxisData.push(this.toTime(now));

      if (userSeriesData.length > limit) {
        userSeriesData.shift();
      }
      userSeriesData.push(data.userCount);

      if (roomSeriesData.length > limit) {
        roomSeriesData.shift();
      }
      roomSeriesData.push(data.roomCount);

      if (clientSeriesData.length > limit) {
        clientSeriesData.shift();
      }
      clientSeriesData.push(data.clientCount);
    });
  }

  private toTime(time) {
    return [this.padStart(time.getHours()),
    this.padStart(time.getMinutes()),
    this.padStart(time.getSeconds())].join(':');
  }

  private padStart(str) {
    return (str + '').padStart(2, '0');
  }

  ngOnDestroy() {
    if (this.fetchTimeout) {
      window.clearTimeout(this.fetchTimeout)
    }
  }
}
