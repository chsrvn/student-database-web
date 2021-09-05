import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { SpinnerService } from '../core/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private httpClient: HttpClient;
  // constructor(
  //   handler: HttpBackend,
  //   private router: Router,
  //   // private spinnerService: SpinnerService
  // ) {
  //   this.httpClient = new HttpClient(handler);
  // }

  // public loginUser(body: any): void {
  //   this.spinnerService.start();
  //   this.httpClient
  //     .post(environment.api + 'auth/authenticate', body)
  //     .pipe(
  //       catchError((err) => {
  //         this.spinnerService.stop();
  //         return of(false);
  //       })
  //     )
  //     .subscribe((res: any) => {
  //       this.spinnerService.stop();
  //       if (!!res) {
  //         sessionStorage.setItem('token', res.jwt.toString());
  //         this.router.navigate(['']);
  //       }
  //     });
  // }

  // public registerUser(body: any): void {
  //   this.httpClient
  //     .post(environment.api + 'user/create', body)
  //     .pipe(
  //       catchError((err) => {
  //         return of(false);
  //       })
  //     )
  //     .subscribe((res: any) => {
  //       if (!!res) {
  //         this.router.navigate(['login']);
  //       }
  //     });
  // }

  // public getToken() {
  //   return sessionStorage.getItem('token');
  // }

  // public isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}
