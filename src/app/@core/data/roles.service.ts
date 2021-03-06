import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetEndPointFullPath } from '../utils/api.config';
import { Observable } from 'rxjs';

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) {
  }

  getStudentRole(): Observable<any> {
    return this.http.get(GetEndPointFullPath('/roles/student'));
  }
}
