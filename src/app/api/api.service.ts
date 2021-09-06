import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserVo } from '../model/IUserVo';

import { UrlService } from './url.service';

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

  
  // getCardDetail(cardId: string): Observable<ICardDetail[]> {
  //   return this.urlService.get('cardDetail/' + cardId);
  // }

  // createCardDetail(cardDetail: ICardDetail): Observable<ICardDetail> {
  //   return this.urlService.post('cardDetail/create', cardDetail);
  // }

  // updateCardDetail(cardDetail: ICardDetail): Observable<ICardDetail> {
  //   return this.urlService.put('cardDetail/update', cardDetail);
  // }
}
