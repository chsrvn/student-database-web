import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  apiUrl = environment.api;
  constructor(private httpClient: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + url);
  }

  public post(url: string, body: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + url, body);
  }

  public put(url: string, body: any): Observable<any> {
    return this.httpClient.put(this.apiUrl + url, body);
  }
}
