import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule,
  MatTooltipModule, MatDialogModule, MatSnackBarModule,
  MatCardModule, MatInputModule, MatRadioModule, MatCheckboxModule,
  MatFormFieldModule, MatSlideToggleModule, MatPaginatorModule, MatSelectModule, MatPaginatorIntl, MatSnackBar
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ApiService } from './util/api.service';
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './util/dialog.component';
import { ChartComponent } from './util/chart.component';
import { OverviewChartComponent } from './home/overview/overview-chart/overview-chart.component';
import { OverviewComponent } from './home/overview/overview.component';
import { NsListComponent } from './home/ns-list/ns-list.component';
import { DialogInputComponent } from './util/dialog-input.component';
import { OverviewEmitterComponent } from './home/overview/overview-emitter/overview-emitter.component';
import { OverviewListComponent } from './home/overview/overview-list/overview-list.component';
import { UserService } from './util/user.service';
import { DialogNsComponent } from './util/dialog-ns/dialog-ns.component';
import { CommonInterceptorService } from 'app/util/common-interceptor.service';
import { SocketService } from 'app/util/socket.service';
import { CopyDirective } from './util/copy.directive';
import { OnlineReportDetailComponent } from './util/online-report-detail/online-report-detail.component';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { UpdateAvailableEvent } from '@angular/service-worker';

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
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule,
    MatTooltipModule, MatDialogModule, MatSnackBarModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate,
    private paginator: MatPaginatorIntl) {

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
