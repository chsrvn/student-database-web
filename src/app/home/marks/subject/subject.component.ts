import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderService } from '../../../core/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../../api/api.service';
import { takeUntil } from 'rxjs/operators';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { ISubjectVo } from '../../../model/ISubjectVo';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent {
  destroy$: Subject<void>;

  subjects: ISubjectVo[];
  classId = null;

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private apiService: ApiService,
    private router: Router
  ) {

  }

  ionViewWillEnter() {
    this.destroy$ = new Subject();
    this.subjects = [];
    this.classId = this.route.snapshot.params.classId;
    this.headerService.setHeader(this.route.snapshot.data.title);
    this.getSubjectData();
  }

  getSubjectData() {
    if (this.classId) {
      this.apiService
        .getSubjectsByClass(this.classId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.subjects = response;
        });
    }
  }

  async presentModal(subjectVo: ISubjectVo, isUpdate: boolean) {
    if (!isUpdate && !!this.classId) {
      subjectVo.classId = this.classId;
    }
    const modal = await this.modalController.create({
      component: CreateSubjectComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject: subjectVo,
        classId: this.classId,
        isUpdate,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (!!result && !!result.data) {
        const subject = result.data;
        if (!isUpdate) {
          this.apiService
            .createSubject(subject)
            .pipe(takeUntil(this.destroy$))
            .subscribe((_) => this.getSubjectData());
        } else {
          subjectVo = { ...subjectVo, ...subject };
          this.apiService
            .updateSubject(subjectVo)
            .pipe(takeUntil(this.destroy$))
            .subscribe((_) => this.getSubjectData());
        }
      }
    });
  }

  openSubject(subjectVo: ISubjectVo) {
    this.router.navigate(['marks', this.classId, 'subjects', subjectVo.id]);
  }

  ionViewWillLeave() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
