import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule, SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { CommonInterceptorService } from 'app/util/common-interceptor.service';
import { SocketService } from 'app/util/socket.service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NsListComponent } from './home/ns-list/ns-list.component';
import { OverviewChartComponent } from './home/overview/overview-chart/overview-chart.component';
import { OverviewEmitterComponent } from './home/overview/overview-emitter/overview-emitter.component';
import { OverviewListComponent } from './home/overview/overview-list/overview-list.component';
import { OverviewComponent } from './home/overview/overview.component';
import { ApiService } from './util/api.service';
import { ChartComponent } from './util/chart.component';
import { CopyDirective } from './util/copy.directive';
import { DialogInputComponent } from './util/dialog-input.component';
import { DialogNsComponent } from './util/dialog-ns/dialog-ns.component';
import { DialogComponent } from './util/dialog.component';
import { OnlineReportDetailComponent } from './util/online-report-detail/online-report-detail.component';
import { UserService } from './util/user.service';
import { WelcomeComponent } from './welcome/welcome.component';

registerLocaleData(zh);

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    WelcomeComponent,
    DialogComponent,
    HomeComponent,
    ChartComponent,
    OverviewChartComponent,
    OverviewComponent,
    NsListComponent,
    DialogInputComponent,
    OverviewEmitterComponent,
    OverviewListComponent,
    DialogNsComponent,
    CopyDirective,
    OnlineReportDetailComponent,
  ],
  entryComponents: [
    OnlineReportDetailComponent,
    DialogComponent,
    DialogInputComponent,
    DialogNsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule, MatButtonToggleModule,
    MatTooltipModule, MatDialogModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatRippleModule,
    MatCardModule, MatInputModule, MatRadioModule, MatCheckboxModule,
    MatFormFieldModule, MatSlideToggleModule, MatPaginatorModule, MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    SocketService,
    ApiService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptorService,
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'zh-cn'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'Y-M-D H:m:s',
        },
        display: {
          dateInput: 'Y-M-D',
          monthYearLabel: 'YYYY 年',
        },
      }
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000, verticalPosition: 'top' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate,
    private paginator: MatPaginatorIntl,
    private matDatepickerIntl: MatDatepickerIntl,
  ) {

    paginator.itemsPerPageLabel = '每页条数';
    paginator.nextPageLabel = '下一页';
    paginator.previousPageLabel = '上一页';

    this.init();
  }

  init() {
    this.swUpdate.available.subscribe((e: UpdateAvailableEvent) => {
      this.snackBar.open('发现新版本', null, { duration: 3000 });
    });
  }
}
