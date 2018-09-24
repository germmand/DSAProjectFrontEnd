import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetEndPointFullPath } from '../utils/api.config';
import { Observable } from 'rxjs';

@Injectable()
export class AreasService {
  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  onGetAllAreas(): Observable<any> {
    return this.http.get(GetEndPointFullPath('/areas/'),
                         this.httpOptions);
  }
}
