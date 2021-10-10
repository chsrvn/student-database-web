import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { IClassVo } from '../../model/IClassVo';
import { HeaderService } from '../../core/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../api/api.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss'],
})
export class MarksComponent {
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

  ionViewWillLeave(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  openClass(group: IClassVo) {
    this.router.navigate(['marks', group.id, 'subjects']);
  }
}
