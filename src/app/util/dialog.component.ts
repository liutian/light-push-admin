import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <div>{{des}}</div>
  `
})
export class DialogComponent {
  constructor( @Inject(MD_DIALOG_DATA) private des: String) { }
}
