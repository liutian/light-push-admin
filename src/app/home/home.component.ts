import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../util/api.service';

@Component({
  selector: 'p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
