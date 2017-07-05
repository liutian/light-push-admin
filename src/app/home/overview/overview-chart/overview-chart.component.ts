import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialog } from '@angular/material';

import { ApiService } from '../../../util/api.service';
import { ChartOption } from './chart-option';
import { DialogInputComponent } from '../../../util/dialog-input.component';

@Component({
  selector: 'p-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent implements OnInit {
  private chartOption: any;
  optionObservable: any;
  optionObserver: any;
  chartOptionOverview: any;
  roomList: any[];
  activeTab: string;
  currChartType: string;

  constructor(private apiService: ApiService,
    private dialog: MdDialog) {
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

  toggleChartView(roomName?) {
    if (roomName) {
      let room = this.roomList.find(v => v.name == roomName);
      if (!room) return;

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
    let room = this.roomList.find(v => v.name == this.activeTab);
    if (type == 'line') {
      this.chartOption = room.chartLineOption;
    } else {
      this.chartOption = room.chartPieOption;
    }
    this.optionObserver.next({ option: this.chartOption, clear: true });
  }

  showAddRoom() {
    let dialogRef = this.dialog.open(DialogInputComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === -1) return;

      if (!result || !result.trim()) {
        alert('请填写房间名');
      } else {
        this.addRoom(result.trim());
      }
    });
  }

  addRoom(roomName) {
    let room = this.roomList.find(v => v.name == roomName);

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
    let index = this.roomList.findIndex(v => v.name == roomName);
    this.roomList.splice(index, 1);
    this.currChartType = 'line';
    if (index == 0 || this.roomList.length == 0) {
      this.chartOption = this.chartOptionOverview;
      this.activeTab = '';
    } else {
      let room = this.roomList[index] || this.roomList[index - 1]
      this.chartOption = room.chartLineOption;
      this.activeTab = room.name;
    }
    this.optionObserver.next({ option: this.chartOption, clear: true });
  }


  fillOverviewOption(chartOption) {
    let now = Date.now();
    let userSeriesData = chartOption.series[0].data;
    let roomSeriesData = chartOption.series[1].data;
    let clientSeriesData = chartOption.series[2].data;
    let xAxis = chartOption.xAxis.data;


    for (let i = 0; i < 100; i++) {
      let time = new Date(now - 5000 * (i + 1));
      xAxis.unshift(this.toTime(time));
      userSeriesData.unshift(null);
      roomSeriesData.unshift(null);
      clientSeriesData.unshift(null);
    }
  }

  fillRoomLineOption(chartOption) {
    let now = Date.now();
    let userSeriesData = chartOption.series[0].data;
    let clientSeriesData = chartOption.series[1].data;
    let xAxis = chartOption.xAxis.data;

    for (let i = 0; i < 100; i++) {
      let time = new Date(now - 5000 * (i + 1));
      xAxis.unshift(this.toTime(time));
      userSeriesData.unshift(null);
      clientSeriesData.unshift(null);
    }
  }

  fetchData() {
    Promise.all([this.fetchOverviewOnlineData(), this.fetchRoomOnlineData()]).then(() => {
      this.optionObserver.next({ option: this.chartOption });

      window.setTimeout(() => {
        this.fetchData();
      }, 5000);
    })
  }

  fetchRoomOnlineData() {
    if (this.roomList.length == 0) return Promise.resolve();

    let firstRoomName = (this.roomList[0] || {}).name;
    let roomNameListParams = this.roomList.map(v => 'room=' + v.name).join('&');
    return this.apiService.onlineReport(roomNameListParams).then(data => {
      if (!Array.isArray(data)) {
        data = [Object.assign(data, { name: firstRoomName })];
      }

      data.forEach(value => {
        let room = this.roomList.find(v => v.name == value.name);
        if (!room) return;

        let now = new Date();
        let limit = 1000;
        let xAxisData = room.chartLineOption.xAxis.data;
        let userSeriesData = room.chartLineOption.series[0].data;
        let clientSeriesData = room.chartLineOption.series[1].data;

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

        let webTotalCount = room.chartPieOption.series[0].data[0].value = value.totalClientCount - value.totalIOSClientCount - value.totalAndroidClientCount;
        room.chartPieOption.series[0].data[1].value = value.totalIOSClientCount;
        room.chartPieOption.series[0].data[2].value = value.totalAndroidClientCount;

        let webCount = room.chartPieOption.series[1].data[0].value = value.clientCount - value.androidClientCount - value.iosClientCount;
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
      let now = new Date();
      let limit = 1000;
      let xAxisData = this.chartOptionOverview.xAxis.data;
      let userSeriesData = this.chartOptionOverview.series[0].data;
      let roomSeriesData = this.chartOptionOverview.series[1].data;
      let clientSeriesData = this.chartOptionOverview.series[2].data;

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
}
