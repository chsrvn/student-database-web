import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './api/route-guard';
import { AccountComponent } from './home/account/account.component';
import { ClassComponent } from './home/class/class.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './home/student/student.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    data: { title: 'Home' },
    component: HomeComponent,
  },
  {
    path: 'class',
    canActivate: [RouteGuard],
    data: { title: 'Class' },
    component: ClassComponent,
  },
  {
    path: 'students',
    canActivate: [RouteGuard],
    data: { title: 'Students' },
    children: [{
      path: '',
      canActivate: [RouteGuard],
      data: { title: 'Students' },
      component: StudentComponent
    }, {
      path: ':classId',
      canActivate: [RouteGuard],
      data: { title: 'Students' },
      component: StudentComponent
    }]
  },
  {
    path: 'account',
    canActivate: [RouteGuard],
    data: { title: 'My Account' },
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
