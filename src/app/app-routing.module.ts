import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './api/route-guard';
import { AccountComponent } from './home/account/account.component';
import { ClassComponent } from './home/class/class.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './home/student/student.component';
import { MarksComponent } from './home/marks/marks.component';
import { SubjectComponent } from './home/marks/subject/subject.component';
import { EnterMarksComponent } from './home/marks/enter-marks/enter-marks.component';

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
    path: 'marks',
    canActivate: [RouteGuard],
    data: { title: 'Marks' },
    children: [
      {
        path: '',
        canActivate: [RouteGuard],
        data: { title: 'Marks' },
        component: MarksComponent,
      },
      {
        path: ':classId/subjects',
        canActivate: [RouteGuard],
        data: { title: 'Marks > Subjects' },
        component: SubjectComponent,
      },
      {
        path: ':classId/subjects/:subjectId',
        canActivate: [RouteGuard],
        data: { title: 'Marks > Subjects' },
        component: EnterMarksComponent,
      },
    ],
  },
  {
    path: 'students',
    canActivate: [RouteGuard],
    data: { title: 'Students' },
    children: [
      {
        path: '',
        canActivate: [RouteGuard],
        data: { title: 'Students' },
        component: StudentComponent,
      },
      {
        path: ':classId',
        canActivate: [RouteGuard],
        data: { title: 'Students' },
        component: StudentComponent,
      },
    ],
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
