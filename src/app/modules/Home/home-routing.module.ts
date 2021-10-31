import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRouteGuard } from 'src/app/shared/guards/login-route.guard';

import { IndexComponent } from './Pages/index/index.component';

const routes: Routes = [
  {
    path: 'home', 
    component: IndexComponent,
    canActivate: [LoginRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
