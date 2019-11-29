import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <form autocomplete="off" #roomForm="ngForm">
      <h2 mat-dialog-title *ngIf="des">{{des}}</h2>
      <mat-dialog-content>
        <mat-form-field>
          <input matInput placeholder="输入房间名" [(ngModel)]="roomName" name="roomName" #roomRef required>
          <mat-error>必填</mat-error>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions style="justify-content: flex-end;">
        <button mat-button [mat-dialog-close]="-1" mat-raised-button>取消</button>
        <button type="submit" mat-button [mat-dialog-close]="roomName" mat-raised-button color="accent" [disabled]="roomForm.form.invalid">添加</button>
      </mat-dialog-actions>
    </form>
  `
})
export class DialogInputComponent {
  roomName;
  constructor(@Inject(MAT_DIALOG_DATA) public des: String) { }
}
