import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { IStudentVo } from '../../../model/IStudentVo';
import { HeaderService } from '../../../core/header.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { IMarksVo } from '../../../model/IMarksVo';

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
  marks: IMarksVo[] = [];

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
    this.getStudentAndMarksData();
  }

  getStudentAndMarksData() {
    if (this.classId) {
      this.apiService
        .getStudentsByClass(this.classId)
        .pipe(
          takeUntil(this.destroy$),
          switchMap((response) => {
            this.students = response;
            return this.apiService.getAllMarksByClassIdAndSubjectId(
              this.classId,
              this.subjectId
            );
          })
        )
        .subscribe((response) => {
          this.marks = response;
        });
    }
  }

  addOrUpdateMarks(event, student: IStudentVo) {
    const studentMark = this.marks.find(
      (element) => element.studentId === student.id
    );
    const score = event.target.value;
    if (!!studentMark) {
      studentMark.marks = score;
    } else {
      this.marks.push({
        marks: score,
        studentId: student.id,
        subjectId: this.subjectId,
        classId: student.classId,
      });
    }
  }

  getScore(student: IStudentVo) {
    const studentScore = this.marks.find(
      (score) => score.studentId === student.id
    );
    return studentScore ? studentScore.marks : '';
  }

  saveOrUpdateScores() {
    if (this.marks.length > 0) {
      this.apiService
        .saveOrUpdateScores(this.marks)
        .pipe(takeUntil(this.destroy$))
        .subscribe((_) => {
          this.getStudentAndMarksData();
        });
    }
  }

  ionViewWillLeave() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
