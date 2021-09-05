import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../core/spinner/spinner.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private spinnerService: SpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    this.spinnerService.start();
    if (!!token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.stop();
          }
        },
        (error) => {
          this.spinnerService.stop();
          if (error instanceof HttpErrorResponse) {
            if (error?.status >= 400 && error?.status < 500) {
            }
          }
        }
      )
    );
  }
}
