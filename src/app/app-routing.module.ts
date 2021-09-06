import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './api/route-guard';
import { AccountComponent } from './home/account/account.component';
import { ClassComponent } from './home/class/class.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: HomeComponent,
  },
  {
    path: 'class',
    canActivate: [RouteGuard],
    component: ClassComponent,
  },
  {
    path: 'account',
    canActivate: [RouteGuard],
    component: AccountComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
