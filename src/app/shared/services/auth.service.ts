import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8082/api/auth/login'; 
  //private loginUrl = 'http://localhost:8082/login'; 
  private signupUrl = 'http://localhost:8082/api/auth/signup'; 

  constructor(private http: HttpClient) {} 
  
  login(credentials: any): Observable<any> { 
    return this.http.post(this.loginUrl, credentials); 
  }

  signup(user: any): Observable<any> { 
    return this.http.post(this.signupUrl, user); 

  } 
  saveToken(token: string): void { 
    localStorage.setItem('token', token);
   } 
  
  getToken(): string | null { 
    return localStorage.getItem('token'); 

   } 
  logout(): void { 
    localStorage.removeItem('token'); 

   } 
   
  
   decodeToken(token: string): any { 
    return jwt_decode(token);
    //return decodeToken(token);
  }

}
