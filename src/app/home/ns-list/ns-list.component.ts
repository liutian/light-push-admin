import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { ApiService } from '../../util/api.service';
import { UserService } from '../../util/user.service';
import { DialogNsComponent } from '../../util/dialog-ns/dialog-ns.component';
import { DialogComponent } from '../../util/dialog.component';


@Component({
  selector: 'p-ns-list',
  templateUrl: './ns-list.component.html',
  styleUrls: ['./ns-list.component.scss']
})
export class NsListComponent implements OnInit {

  nsList: any[];

  constructor(private apiService: ApiService,
    private router: Router,
    private dialog: MdDialog,
    private user: UserService) { }

  ngOnInit() {
    this.apiService.encodeAuth(this.user.key, this.user.password);
    this.apiService.nsQueryList().then(v => {
      this.nsList = v;
    });
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
        this.nsList = v;
      });
    });
  }

  updateNs(namespace) {
    let dialogRef = this.dialog.open(DialogNsComponent, {
      data: {
        namespace: namespace,
        close: function (data) {
          dialogRef.close(data);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.apiService.nsQueryList().then(v => {
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
