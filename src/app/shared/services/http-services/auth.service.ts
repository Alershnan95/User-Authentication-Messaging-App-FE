import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpApiConstants } from 'src/app/shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(request: any): any {
    return this.http.post(HttpApiConstants.auth.SIGN_UP, request);
  }

  signIn(request: any): any {
    return this.http.post(HttpApiConstants.auth.SIGN_IN, request);
  }

  getUsersEmails(): any {
    return this.http.get(HttpApiConstants.auth.USERS);
  }

}
