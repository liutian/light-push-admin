import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
  showNsName = false;

  constructor(private apiService: ApiService,
    public user: UserService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.showNsName = this.router.isActive('/home', false);
      }
    })
  }

  logout() {
    this.user.save({});
    this.router.navigateByUrl('/welcome');
  }

}
