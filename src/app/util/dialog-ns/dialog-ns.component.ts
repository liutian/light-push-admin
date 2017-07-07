import { Component, OnInit, Input, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { ApiService } from '../../util/api.service';

@Component({
  selector: 'p-dialog-ns',
  templateUrl: './dialog-ns.component.html',
  styleUrls: ['./dialog-ns.component.scss']
})
export class DialogNsComponent implements OnInit {
  namespace: any;
  isNew: boolean;
  closeDialog: Function;


  constructor( @Inject(MD_DIALOG_DATA) private data: any, private apiService: ApiService) {
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
    this.apiService.saveNamespace(data).then(v => {
      this.closeDialog(true);
    })
  }
}
