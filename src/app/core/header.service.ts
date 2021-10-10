import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  header$ = new BehaviorSubject<string>('Student Database');

  public setHeader(title: string) {
    if (!!title) {
      this.header$.next(title);
    }
  }
}
