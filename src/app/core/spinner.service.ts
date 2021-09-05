import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading = false;

  constructor(public loadingController: LoadingController) {}

  async start() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: 'Please wait...',
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        });
      });
  }

  async stop() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
