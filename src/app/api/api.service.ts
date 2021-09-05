import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private urlService: UrlService) {}

  // getAllCards(): Observable<ICard[]> {
  //   return this.urlService.get('card/getAllCards');
  // }

  // createNewCard(card: ICard): Observable<ICard> {
  //   return this.urlService.post('card/create', card);
  // }

  
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
