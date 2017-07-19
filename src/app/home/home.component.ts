import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { ApiService } from '../util/api.service';
import { UserService } from '../util/user.service';
import { DialogNsComponent } from '../util/dialog-ns/dialog-ns.component';

@Component({
  selector: 'p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService,
    public user: UserService,
    private dialog: MdDialog,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.user.save({});
    this.router.navigate(['welcome']);
  }

}
