import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { ApiService } from 'app/util/api.service';
import { UserService } from 'app/util/user.service';
import { DialogNsComponent } from 'app/util/dialog-ns/dialog-ns.component';
import { DialogComponent } from 'app/util/dialog.component';


@Component({
  selector: 'p-ns-list',
  templateUrl: './ns-list.component.html',
  styleUrls: ['./ns-list.component.scss']
})
export class NsListComponent implements OnInit {

  nsList: any[];
  searchForm: any;
  nsListAll: any[];
  searchKeySubject = new BehaviorSubject<string>('');
  searchNameSubject = new BehaviorSubject<string>('');

  constructor(private apiService: ApiService,
    private router: Router,
    private dialog: MdDialog,
    private user: UserService) {
  }

  ngOnInit() {
    this.apiService.encodeAuth(this.user.key, this.user.password);
    this.apiService.nsQueryList().then(v => {
      this.nsListAll = v;
      this.nsList = v;
    });
    Observable.combineLatest(this.searchKeySubject, this.searchNameSubject).debounceTime(1000).distinctUntilChanged().subscribe(arr => {
      this.nsList = this.nsListAll.filter(v => {
        let match = true;

        if (arr[0] && !v.key.includes(arr[0])) {
          match = false;
        }
        if (arr[1] && !v.name.includes(arr[1])) {
          match = false;
        }

        return match;
      });

      console.dir(this.nsList);
    })
  }

  addNs() {
    let dialogRef = this.dialog.open(DialogNsComponent, {
      data: {
        close: function (data) {
          dialogRef.close(data);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.apiService.nsQueryList().then(v => {
        this.nsListAll = v;
        this.nsList = v;
      });
    });
  }

  updateNs(namespace) {
    let dialogRef = this.dialog.open(DialogNsComponent, {
      data: {
        namespace,
        close: function (data) {
          dialogRef.close(data);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.apiService.nsQueryList().then(v => {
        this.nsListAll = v;
        this.nsList = v;
      });
    });
  }

  nsEnter(ns) {
    this.apiService.encodeAuth(ns.key, ns.auth_passwd);
    this.router.navigate(['home']);
    return false;
  }

  delNs(namespace, index) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        des: '确定删除吗?',
        confirm: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.apiService.delNamespace(namespace.key).then(v => {
        this.nsList.splice(index, 1);
      });
    });
  }
}
