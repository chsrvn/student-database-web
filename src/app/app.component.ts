import { Component, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from './core/header.service';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = '';
  destroy$ = new Subject();
  constructor(
    public loginService: LoginService,
    private menuController: MenuController,
    headerService: HeaderService
  ) {
    headerService.header$
      .pipe(takeUntil(this.destroy$))
      .subscribe((title) => (this.title = title));
  }

  onLogout() {
    this.loginService.logout();
    this.closeMenu();
  }

  public closeMenu() {
    this.menuController.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
