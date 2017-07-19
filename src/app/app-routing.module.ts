import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './home/overview/overview.component';
import { NsListComponent } from './home/ns-list/ns-list.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }, {
    path: 'welcome',
    component: WelcomeComponent
  }, {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      }, {
        path: 'ns-list',
        component: NsListComponent
      }
    ]
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'welcome'
  // },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
