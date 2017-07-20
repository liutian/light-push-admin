import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <md-dialog-content>
      <pre *ngIf="data.pre">{{data.des}}</pre>
      <div *ngIf="!data.pre">{{data.des}}</div>
    </md-dialog-content>
    <md-dialog-actions *ngIf="data.confirm">
      <button md-button md-dialog-close md-raised-button>取消</button>&nbsp;&nbsp;
      <button md-raised-button color="accent" [md-dialog-close]="true">确定</button>
    </md-dialog-actions>
  `
})
export class DialogComponent {
  constructor( @Inject(MD_DIALOG_DATA) public data: any) { }
}
