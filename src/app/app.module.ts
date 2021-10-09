import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CustomHttpInterceptor } from './api/http-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './home/account/account.component';
import { ClassComponent } from './home/class/class.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateClassComponent } from './home/class/create-class/create-class.component';
import { StudentComponent } from './home/student/student.component';
import { CreateStudentComponent } from './home/student/create-student/create-student.component';
import { MarksComponent } from './home/marks/marks.component';
import { SubjectComponent } from './home/marks/subject/subject.component';
import { CreateSubjectComponent } from './home/marks/subject/create-subject/create-subject.component';
import { EnterMarksComponent } from './home/marks/enter-marks/enter-marks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClassComponent,
    AccountComponent,
    CreateClassComponent,
    StudentComponent,
    CreateStudentComponent,
    MarksComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EnterMarksComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
