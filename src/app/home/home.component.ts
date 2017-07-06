import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { ApiService } from '../util/api.service';
import { UserService } from '../util/user.service';

@Component({
  selector: 'p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService,
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  home() {
    if (this.user.role == 'admin') {
      this.router.navigate(['home/ns-list']);
    } else {
      alert('ss');
    }
  }

}
