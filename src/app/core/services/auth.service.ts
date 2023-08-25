import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient ,private _Router:Router) { 
    this.userData();
  }

  user:BehaviorSubject<any> = new BehaviorSubject(null)

  register(formData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl+'signup',formData)
  }
  login(formData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl+'signin',formData)
  }
  logOut():void {
    localStorage.removeItem('__notetokem');
    this.user.next(false);
    this._Router.navigate(['/login']);

  }


  userData():void{ 
    const token = localStorage.getItem('_notetokem')
    if(token !== null){
      const userData = jwtDecode(token);
      this.user.next(userData)
      this._Router.navigate(['/home'])

    }

  }

}
