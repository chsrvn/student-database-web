import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/core/header.service';
import { ModalController } from '@ionic/angular';
import { CreateClassComponent } from './create-class/create-class.component';
import { ApiService } from '../../api/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IClassVo } from '../../model/IClassVo';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent {
  destroy$ = new Subject();

  classes: IClassVo[] = [];

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private apiService: ApiService,
    private router: Router
  ) {
    this.headerService.setHeader(this.route.snapshot.data.title);
  }

  ionViewWillEnter(): void {
    this.getClassData();
  }

  getClassData() {
    this.apiService
      .getClasses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.classes = response;
      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateClassComponent,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      this.apiService
        .createClass({ name: result.data })
        .pipe(takeUntil(this.destroy$))
        .subscribe((_) => this.getClassData());
    });
  }

  ionViewWillLeave(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  openClass(group: IClassVo) {
    this.router.navigate(['students', group.id]);
  }
}
