import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ApiService } from 'app/util/api.service';
import { UserService } from 'app/util/user.service';
import { DialogNsComponent } from 'app/util/dialog-ns/dialog-ns.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  env = environment;
  $showNsName = new Subject<boolean>();

  constructor(private apiService: ApiService,
    public user: UserService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.user.save({});
    this.router.navigateByUrl('/welcome');
  }

}
