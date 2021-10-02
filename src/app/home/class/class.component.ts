import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/header.service';
import { ModalController } from '@ionic/angular';
import { CreateClassComponent } from './create-class/create-class.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent {
  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {
    this.headerService.setHeader(this.route.snapshot.data['title']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateClassComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
}
