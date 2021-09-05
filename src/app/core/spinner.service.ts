import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  constructor(public loadingController: LoadingController) {}

  async start() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  async stop() {
    await this.loadingController.dismiss();
  }
}
