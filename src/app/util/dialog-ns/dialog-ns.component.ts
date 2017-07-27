import { Component, OnInit, Input, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog } from '@angular/material';

import { ApiService } from 'app/util/api.service';
import { DialogComponent } from 'app/util/dialog.component';

@Component({
  selector: 'p-dialog-ns',
  templateUrl: './dialog-ns.component.html',
  styleUrls: ['./dialog-ns.component.scss']
})
export class DialogNsComponent implements OnInit {

  namespace: any;
  isNew: boolean;
  closeDialog: Function;


  constructor( @Inject(MD_DIALOG_DATA) private data: any,
    private apiService: ApiService,
    private dialog: MdDialog) {
    this.closeDialog = data.close;
    this.isNew = !data.namespace;
    if (this.isNew) {
      this.namespace = { apns_list: [] };
    } else {
      this.namespace = Object.assign({}, data.namespace);
      if (!Array.isArray(this.namespace.apns_list)) {
        this.namespace.apns_list = [];
      }
    }
  }

  ngOnInit() {
    this.namespace.offline = this.namespace.offline == 'on';
  }

  addApns() {
    this.namespace.apns_list.push({ name: 'default', apns_env: 'dev', isNew: true });
  }

  toggleDel(apns) {
    apns.del = !apns.del;
  }

  saveNamespace() {
    let data = Object.assign({}, this.namespace);
    if (this.isNew) {
      data.key = '/' + data.key;
    }
    data.offline = data.offline ? 'on' : 'off';
    this.apiService.saveNamespace(data).then(v => {
      this.closeDialog(true);
    })
  }

  clearDirtyClient() {
    this.apiService.clearDirtyClient({ namespace: this.namespace.key }).then(v => {
      let dialogRef = this.dialog.open(DialogComponent, { data: { des: '清除成功' } });
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    })
  }
}
