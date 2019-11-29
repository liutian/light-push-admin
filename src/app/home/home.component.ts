import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'app/util/api.service';
import { UserService } from 'app/util/user.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';


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
