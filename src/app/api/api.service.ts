import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserVo } from '../model/IUserVo';

import { UrlService } from './url.service';
import { IClassVo } from '../model/IClassVo';
import { IStudentVo } from '../model/IStudentVo';
import { ISubjectVo } from '../model/ISubjectVo';
import { IMarksVo } from '../model/IMarksVo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private urlService: UrlService) {}

  getAccountDetails(): Observable<IUserVo> {
    return this.urlService.get('user/getAccountDetails');
  }

  updatePassword(user: any): Observable<any> {
    return this.urlService.post('auth/updatePassword', user);
  }

  getClasses(): Observable<IClassVo[]> {
    return this.urlService.get('class/getAllClasses');
  }

  createClass(classVo: IClassVo): Observable<IClassVo> {
    return this.urlService.post('class/create', classVo);
  }

  getAllStudents(): Observable<IStudentVo[]> {
    return this.urlService.get('student/getAllStudents');
  }

  getStudentsByClass(classId: string): Observable<IStudentVo[]> {
    return this.urlService.get('student/getAllStudents/' + classId);
  }

  addStudent(studentVo: IStudentVo): Observable<IStudentVo> {
    return this.urlService.post('student/add', studentVo);
  }

  updateStudent(studentVo: IStudentVo): Observable<IStudentVo> {
    return this.urlService.put('student/update', studentVo);
  }

  getSubjectsByClass(classId: string) {
    return this.urlService.get('subject/getAllSubjects/' + classId);
  }

  createSubject(subjectVo: ISubjectVo) {
    return this.urlService.post('subject/add', subjectVo);
  }

  getAllMarksByClassIdAndSubjectId(classId: string, subjectId: string) {
    return this.urlService.get(`marks/getAllMarks/${classId}/${subjectId}`);
  }

  saveOrUpdateScores(marks: IMarksVo[]) {
    return this.urlService.post('marks/saveOrUpdate', marks);
  }
}
