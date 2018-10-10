import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetEndPointFullPath } from '../utils/api.config';

@Injectable()
export class ProgramsService {
  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  onGetProgram(id): Observable<any> {
    return this.http.get(GetEndPointFullPath('/programs/' + id),
                         this.httpOptions);
  }
}
