import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/header.service';
import { ModalController } from '@ionic/angular';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ApiService } from '../../api/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStudentVo } from '../../model/IStudentVo';
import { IClassVo } from '../../model/IClassVo';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  destroy$ = new Subject();

  students: IStudentVo[] = [];
  classList: IClassVo[] = [];
  classId = null;

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private apiService: ApiService
  ) {
    this.classId = this.route.snapshot.params.classId;
    this.headerService.setHeader(this.route.snapshot.data.title);
  }

  ionViewWillEnter() {
    this.getStudentData();
    this.getClassData();
  }

  getStudentData() {
    if (this.classId) {
      this.apiService
        .getStudentsByClass(this.classId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.students = response;
        });
    } else {
      this.apiService
        .getAllStudents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.students = response;
        });
    }
  }

  getClassData() {
    this.apiService
      .getClasses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.classList = response;
      });
  }

  async presentModal(studentVo: IStudentVo, isUpdate: boolean) {
    if (!isUpdate && !!this.classId) {
      studentVo.classId = this.classId;
    }
    const modal = await this.modalController.create({
      component: CreateStudentComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        classList: this.classList,
        student: studentVo,
        classId: this.classId,
        isUpdate,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (!!result && !!result.data) {
        const student = result.data;
        if (!isUpdate) {
          this.apiService
            .addStudent(student)
            .pipe(takeUntil(this.destroy$))
            .subscribe((_) => this.getStudentData());
        } else {
          studentVo = { ...studentVo, ...student };
          this.apiService
            .updateStudent(studentVo)
            .pipe(takeUntil(this.destroy$))
            .subscribe((_) => this.getStudentData());
        }
      }
    });
  }

  ionViewWillLeave() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
