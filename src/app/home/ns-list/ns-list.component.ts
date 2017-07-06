import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../util/api.service';
import { UserService } from '../../util/user.service';

@Component({
  selector: 'p-ns-list',
  templateUrl: './ns-list.component.html',
  styleUrls: ['./ns-list.component.scss']
})
export class NsListComponent implements OnInit {

  nsList: Promise<any[]>;

  constructor(private apiService: ApiService,
    private router: Router,
    private user: UserService) { }

  ngOnInit() {
    this.apiService.encodeAuth(this.user.key, this.user.password);
    this.nsList = this.apiService.nsQueryList();
  }

  nsEnter(ns) {
    this.apiService.encodeAuth(ns.key, ns.auth_passwd);
    this.router.navigate(['home']);
    return false;
  }

}
