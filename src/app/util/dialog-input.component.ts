import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h2 mat-dialog-title *ngIf="des">{{des}}</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="输入房间名" #roomRef>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="-1" mat-raised-button>取消</button>&nbsp;&nbsp;
      <button mat-button [mat-dialog-close]="roomRef.value" mat-raised-button color="accent">添加</button>
    </mat-dialog-actions>
  `
})
export class DialogInputComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public des: String) { }
}
