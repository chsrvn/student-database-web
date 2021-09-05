import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CONSTANTS } from '../constants/constants';
import { SpinnerService } from '../core/spinner.service';
import { ToasterService } from '../core/toaster.service';
// import { SpinnerService } from '../core/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient: HttpClient;

  constructor(
    handler: HttpBackend,
    private router: Router,
    private spinnerService: SpinnerService,
    private toasterService: ToasterService
  ) {
    this.httpClient = new HttpClient(handler);
  }

  public loginUser(body: any): void {
    this.spinnerService.start();
    this.httpClient.post(environment.api + 'auth/authenticate', body).subscribe(
      (res: any) => {
        this.spinnerService.stop();
        if (!!res) {
          sessionStorage.setItem('token', res.jwt.toString());
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.spinnerService.stop();
        if (error.status === 401) {
          this.toasterService.presentToast(error?.error?.message);
        } else {
          this.toasterService.presentToast(CONSTANTS.DEFAULT_ERROR_MSG);
        }
      }
    );
  }

  public registerUser(body: any) {
    return this.httpClient.post(environment.api + 'user/create', body);
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public validateJWTToken() {
    const token = this.getToken();
    return this.httpClient
      .get(environment.api + 'auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          return of(false);
        })
      );
  }

  public logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
