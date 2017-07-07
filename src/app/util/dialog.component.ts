import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <md-dialog-content>{{data.des}}</md-dialog-content>
    <md-dialog-actions *ngIf="data.confirm">
      <button md-button md-dialog-close>取消</button>&nbsp;&nbsp;
      <button md-raised-button color="primary" [md-dialog-close]="true">确定</button>
    </md-dialog-actions>
  `
})
export class DialogComponent {
  constructor( @Inject(MD_DIALOG_DATA) private data: any) { }
}
