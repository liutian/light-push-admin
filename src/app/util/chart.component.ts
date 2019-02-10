import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

const scriptPath = 'assets/lib/echart/';

@Component({
  selector: 'p-chart',
  template: ''
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartWidth = 700;
  @Input() chartHeight = 370;
  @Input() optionObservable: Observable<any>;
  private chart: any;
  private chartOption: any;

  constructor(private eleRef: ElementRef) { }

  ngOnChanges(changes) {
  }

  ngOnInit() {
    if (!window.echarts) {
      window.LazyLoad.js(scriptPath + 'echarts.min.js', this.init, null, this);
    } else {
      this.init();
    }

    if (this.optionObservable) {
      this.optionObservable.subscribe(data => {
        this.chartOption = data.option;
        if (!this.chart) {
          return;
        }

        this.chart.hideLoading();
        this.chart.setOption(data.option, { notMerge: data.clear });
      });
    } else {
      throw new Error('optionObservable cannot be null');
    }
  }

  init() {
    const ele = this.eleRef.nativeElement;
    ele.style.width = this.chartWidth + 'px';
    ele.style.height = this.chartHeight + 'px';

    this.chart = window.echarts.init(ele);
    if (this.chartOption) {
      this.chart.setOption(this.chartOption);
    } else {
      this.chart.showLoading();
    }
  }
}
