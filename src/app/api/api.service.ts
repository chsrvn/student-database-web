import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserVo } from '../model/IUserVo';

import { UrlService } from './url.service';
import { IClassVo } from '../model/IClassVo';
import {IStudentVo} from "../model/IStudentVo";

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

  // updateCardDetail(cardDetail: ICardDetail): Observable<ICardDetail> {
  //   return this.urlService.put('cardDetail/update', cardDetail);
  // }


  getAllStudents(): Observable<IStudentVo[]> {
    return this.urlService.get('student/getAllStudents');
  }

  getStudentsByClass(classId: string): Observable<IStudentVo[]> {
    return this.urlService.get('student/getStudents/' + classId);
  }

  createStudent(studentVo: IStudentVo): Observable<IClassVo> {
    return this.urlService.post('student/create', studentVo);
  }

}
