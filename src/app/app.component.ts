import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public loginService: LoginService,
    private menuController: MenuController
  ) {}

  onLogout() {
    this.loginService.logout();
    this.menuController.close();
  }
}
