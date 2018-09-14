import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getId } from '../store/user';
import { switchMap } from 'rxjs/operators';
import { GetEndPointFullPath } from '../utils/api.config';

@Injectable()
export class AdmissionsService {
  private httpOptions: any;

  constructor(private http: HttpClient,
              private store: Store<IAppState>) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  onGetAdmissionsStatuses(): Observable<any> {
    return this.store.pipe(
      select(getId),
      switchMap(id => {
       return this.http.get(GetEndPointFullPath('/admissions/statuses/' + id),
                            this.httpOptions);
      }),
    );
  }
}
