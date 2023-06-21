import { Injectable } from '@angular/core';
import { ApiconfigService } from './apiconfig.service';
import User  from '../models/User'
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: User;
  errorMsg:any;
  jwtHelper = new JwtHelperService();
  constructor(private apiConfigService: ApiconfigService,private cookie:CookieService) { 
    
  }

  registerUser(user:User) {
    let data = {
      auth_email: user.auth_email,
      auth_password: user.auth_password
    }
    console.log('inside reg',data);
    return this.apiConfigService.post('api/users/signup',data).pipe(catchError(this.handleError));
    }

  private handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.status===0){
      console.error('Client side error: ',errorResponse.error.message);
    } else {
      console.error('server side error: ',errorResponse.error.errors[0].message);
      this.errorMsg=errorResponse.error.errors[0].message;
    }

    return throwError(this.errorMsg);
    //return new Observable();
  }

  
  storeUserData(token:any, user:User) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  signinUser(user: User) {
    let data = {
      auth_email: user.auth_email,
      auth_password: user.auth_password
    }

    console.log('in auth sign-in service: ',data)
    return this.apiConfigService.post('api/users/signin', data);
    }

  signoutUser(user: User) {
     let data = {
       auth_email: user.auth_email,
       auth_password: user.auth_password
     }
     localStorage.clear();
     this.cookie.deleteAll();
     return this.apiConfigService.post('api/users/signout',data);
     
     }

  getProfile() {
    return this.apiConfigService.get('api/users/currentuser');
  }

  notLoggedIn() {
    const jwtService: JwtHelperService = new JwtHelperService();
    const item: any = jwtService.tokenGetter();
    console.log(this.jwtHelper.isTokenExpired(item))
    return this.jwtHelper.isTokenExpired(item);
  }

tokenNotExpired()
{
    const jwtService: JwtHelperService = new JwtHelperService();
    const item: any = jwtService.tokenGetter();
    console.log('item',item);
    return item != null && !jwtService.isTokenExpired(item);
}
  }
  

  
