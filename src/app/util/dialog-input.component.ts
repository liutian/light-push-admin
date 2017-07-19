import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h2 md-dialog-title *ngIf="des">{{des}}</h2>
    <md-dialog-content>
      <md-input-container>
        <input mdInput placeholder="输入房间名" #roomRef>
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions>
      <button md-button [md-dialog-close]="roomRef.value" color="primary">添加</button>
      <button md-button [md-dialog-close]="-1">取消</button>
    </md-dialog-actions>
  `
})
export class DialogInputComponent {
  constructor( @Inject(MD_DIALOG_DATA) public des: String) { }
}
