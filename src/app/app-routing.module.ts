import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NsListComponent } from './home/ns-list/ns-list.component';
import { OverviewComponent } from './home/overview/overview.component';
import { AuthHomeNsListGuard } from './util/auth-home-ns-list.guard';
import { AuthHomeGuard } from './util/auth-home.guard';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        canActivate: [AuthHomeGuard],
      },
      {
        path: 'ns-list',
        component: NsListComponent,
        canActivate: [AuthHomeNsListGuard],
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
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
