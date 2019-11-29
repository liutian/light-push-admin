export class ChartOption {
  static createOverviewOpton() {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['用户', '房间', '终端'],
        top: 20
      },
      toolbox: {
        show: true,
        feature: {
          // dataView: { readOnly: false },
          // restore: {},
          saveAsImage: {}
        },
        top: 15
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [{
        name: '用户',
        type: 'line',
        showSymbol: false,
        data: []
      }, {
        name: '房间',
        type: 'line',
        showSymbol: false,
        data: []
      }, {
        name: '终端',
        type: 'line',
        showSymbol: false,
        data: []
      }]
    };
  }

  static createRoomLineOption() {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['用户', '终端'],
        top: 20
      },
      toolbox: {
        show: true,
        feature: {
          // dataView: { readOnly: false },
          // restore: {},
          saveAsImage: {}
        },
        top: 15
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [{
        name: '用户',
        type: 'line',
        showSymbol: false,
        data: []
      }, {
        name: '终端',
        type: 'line',
        showSymbol: false,
        data: []
      }]
    };
  }

  static createRoomPieOption() {
    return {
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        },
        top: 15
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: ['Web', 'IOS', 'Android', 'Web在线', 'Web离线', 'IOS在线', 'IOS离线', 'Android在线', 'Android离线'],
        orient: 'vertical',
        top: 20,
        left: 10
      },
      series: [
        {
          name: '终端来源',
          type: 'pie',
          center: ['60%', '50%'],
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { name: 'Web', value: 0 },
            { name: 'IOS', value: 0 },
            { name: 'Android', value: 0 }
          ]
        },
        {
          name: '终端来源',
          type: 'pie',
          center: ['60%', '50%'],
          radius: ['40%', '55%'],
          data: [
            { name: 'Web在线', value: 0 },
            { name: 'Web离线', value: 0 },
            { name: 'IOS在线', value: 0 },
            { name: 'IOS离线', value: 0 },
            { name: 'Android在线', value: 0 },
            { name: 'Android离线', value: 0 },
          ]
        }
      ]
    };
  }
}
