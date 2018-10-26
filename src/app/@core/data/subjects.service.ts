import { Injectable } from '@angular/core';
import { GetEndPointFullPath } from '../utils/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SubjectsService {
  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  onGetSubjecsToSignup(admission_id): Observable<any> {
    return this.http.get(GetEndPointFullPath(`/subjects/${admission_id}`),
                         this.httpOptions);
  }

  onGetAllSubjects(admission_id): Observable<any> {
    return this.http.get(GetEndPointFullPath(`/subjects/all/${admission_id}`),
                         this.httpOptions);
  }
}
