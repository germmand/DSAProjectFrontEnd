import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {GetEndPointFullPath} from '../utils/api.config';

@Injectable()
export class LoginService {
  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };
  }

  onLogin(loginData: FormGroup): Observable<any> {
    return this.http.post(GetEndPointFullPath('/auth/login'),
                          loginData.value,
                          this.httpOptions);
  }
}
