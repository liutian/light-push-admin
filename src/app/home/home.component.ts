import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { ApiService } from 'app/util/api.service';
import { UserService } from 'app/util/user.service';
import { DialogNsComponent } from 'app/util/dialog-ns/dialog-ns.component';

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
    this.router.navigateByUrl('/welcome');
  }

}
