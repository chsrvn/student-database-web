import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UrlValidateRouteGuard implements CanActivate {
  keys = ['classId', 'subjectId'];

  constructor(
    private router: Router,
    private apiService: ApiService,
    public toastController: ToastController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (
      !!route.params &&
      !!route.paramMap.keys &&
      route.paramMap.keys.length > 0 &&
      route.paramMap.keys.some((key) => this.keys.includes(key))
    ) {
      return this.apiService
        .validateClassId(route.paramMap.get(this.keys[0]))
        .pipe(
          switchMap((res) => {
            if (!!route.paramMap.get(this.keys[1])) {
              return this.apiService
                .validateSubjectId(route.paramMap.get(this.keys[1]))
                .pipe(
                  switchMap((result) => {
                    if (!result) {
                      this.router.navigate([
                        route.pathFromRoot[route.pathFromRoot.length - 2]
                          ?.url[0]?.path,
                      ]);
                      return of(false);
                    }
                    return of(true);
                  })
                );
            }
            return of(res);
          }),
          switchMap((res) => {
            if (!res) {
              this.router.navigate([
                route.pathFromRoot[route.pathFromRoot.length - 2]?.url[0]?.path,
              ]);

              return of(false);
            }
            return of(true);
          }),
          catchError((_) => {
            this.router.navigate([
              route.pathFromRoot[route.pathFromRoot.length - 2]?.url[0]?.path,
            ]);
            return of(false);
          })
        );
    }
    return of(false);
  }
}
