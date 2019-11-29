import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/util/api.service';


@Component({
  selector: 'p-dialog-ns',
  templateUrl: './dialog-ns.component.html',
  styleUrls: ['./dialog-ns.component.scss']
})
export class DialogNsComponent implements OnInit {

  namespace: any;
  isNew: boolean;
  closeDialog: Function;


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private dialog: MatDialog) {
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
    const data = Object.assign({}, this.namespace);
    if (this.isNew) {
      if (this.namespace.key && !/[A-Za-z0-9]/.test(this.namespace.key)) {
        this.snackBar.open('必须是字母或数字', null, { duration: 3000 });
        return;
      }
      data.key = '/' + data.key.trim().replace(/^\/*/, '');
    }
    this.apiService.saveNamespace(data).then(v => {
      this.closeDialog(true);
    });
  }

  nsKeyChange(text) {
    if (text && !/[A-Za-z0-9]/.test(text)) {
      this.snackBar.open('必须是字母或数字', null, { duration: 3000 });
      this.namespace.key = '';
    }
  }

}
