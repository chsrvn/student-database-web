import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { IStudentVo } from '../../../model/IStudentVo';
import { HeaderService } from '../../../core/header.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-enter-marks',
  templateUrl: './enter-marks.component.html',
  styleUrls: ['./enter-marks.component.scss'],
})
export class EnterMarksComponent {
  destroy$ = new Subject();

  students: IStudentVo[] = [];
  classId = null;
  subjectId = null;

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.classId = this.route.snapshot.params.classId;
    this.subjectId = this.route.snapshot.params.subjectId;
    this.headerService.setHeader(this.route.snapshot.data.title);
  }

  ionViewWillEnter() {
    this.getStudentData();
  }

  getStudentData() {
    if (this.classId) {
      this.apiService
        .getStudentsByClass(this.classId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.students = response;
        });
    }
  }

  addOrUpdateMarks(student: IStudentVo) {}

  ionViewWillLeave() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
