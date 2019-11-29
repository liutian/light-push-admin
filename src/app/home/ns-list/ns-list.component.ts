import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'app/util/api.service';
import { DialogNsComponent } from 'app/util/dialog-ns/dialog-ns.component';
import { DialogComponent } from 'app/util/dialog.component';
import { UserService } from 'app/util/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'p-ns-list',
  templateUrl: './ns-list.component.html',
  styleUrls: ['./ns-list.component.scss']
})
export class NsListComponent implements OnInit, OnDestroy {

  nsList: any[];
  searchSubject = new BehaviorSubject<any>({});
  stateList = [
    { title: '全部', value: '' },
    { title: '上线', value: 'off' },
    { title: '下线', value: 'on' },
  ];
  formData = {
    key: '',
    name: '',
    offline: '',
    page: 1,
    pageSize: 20
  };
  nsTotal = 0;
  allNsOnline: any = {};
  timeoutSearchAllOnline;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private user: UserService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.apiService.encodeAuth(this.user.key, this.user.password);
    this.searchSubject.subscribe(params => {
      this.searchNs(params);
    });
    this.searchAllOnline();
  }

  addNs() {
    const dialogRef = this.dialog.open(DialogNsComponent, {
      data: {
        close: function (data) {
          dialogRef.close(data);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.searchNs();
    });
  }

  updateNs(namespace) {
    const dialogRef = this.dialog.open(DialogNsComponent, {
      data: {
        namespace,
        close: function (data) {
          dialogRef.close(data);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.searchNs();
    });
  }

  searchAllOnline() {
    this.apiService.onlineReportAdmin().then((data) => {
      this.allNsOnline = data;

      this.timeoutSearchAllOnline = window.setTimeout(this.searchAllOnline.bind(this), 5000);
    });
  }

  searchNs(pageObj?) {
    const params = Object.assign({ online: true }, this.formData, pageObj);
    if (pageObj && pageObj.pageSize) {
      this.formData.pageSize = pageObj.pageSize;
    }

    this.apiService.nsQueryList(params).then(result => {
      this.nsList = result.list;
      this.nsTotal = result.total;
    });
  }

  dashboard(ns) {
    this.user.save({ namespace: ns.key, nsName: ns.name });
    this.apiService.encodeAuth(ns.key, ns.auth_passwd);
    this.router.navigate(['home']);
    return false;
  }

  clearNs(namespace, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        des: '确定删除吗?',
        confirm: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.apiService.clearNamespace(namespace.key).then(v => {
        this.snackBar.open('操作成功', null, { duration: 3000 });
      });
    });
  }

  flushNs(namespace, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        des: '确定删除包括命名空间本身在内的所有数据吗?',
        confirm: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.apiService.flushNamespace(namespace.key).then(v => {
        this.nsList.splice(index, 1);
      });
    });
  }

  toggleOffline(namespace) {
    this.apiService.saveNamespace({
      key: namespace.key,
      offline: namespace.offline === 'off' ? 'on' : 'off'
    }).then(r => {
      namespace.offline = namespace.offline === 'off' ? 'on' : 'off';
    });
  }

  clearRealTimeData(namespace) {
    this.apiService.clearRealTimeData({
      namespace: namespace.key
    }).then(r => {
      this.snackBar.open('操作成功', null, { duration: 3000 });
    });
  }

  clearLegacyClient(namespace) {
    this.apiService.clearLegacyClient({
      namespace: namespace.key
    }).then(r => {
      this.snackBar.open('操作成功', null, { duration: 3000 });
    });
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeoutSearchAllOnline);
  }
}
