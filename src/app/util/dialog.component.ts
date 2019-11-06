import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <mat-dialog-content>
      <pre *ngIf="data.pre">{{data.des}}</pre>
      <div *ngIf="!data.pre">{{data.des}}</div>
    </mat-dialog-content>
    <mat-dialog-actions *ngIf="data.confirm">
      <button mat-button mat-dialog-close mat-raised-button>取消</button>&nbsp;&nbsp;
      <button mat-raised-button color="accent" [mat-dialog-close]="true">确定</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}
