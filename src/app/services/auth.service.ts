import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root'})
export class AuthService {

  public baseURL = environment.apiUrl;
  private token: string = "";
  private loggedInUsername: string = "";
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(employee: Employee): Observable<HttpResponse<Employee>> {
    return this.http.post<Employee>(`${this.baseURL}/employee/login`, employee, {observe: 'response'});
  }

  register(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseURL}/employee/register`, employee);
  }

  logOut(): void {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalStorage(employee: Employee): void {
    localStorage.setItem('user', JSON.stringify(employee));
  }

  getUserFromLocalStorage(): Employee {
    return JSON.parse(localStorage.getItem('user')!);
  }

  // Sets this.token to token from local storage
  loadToken(): void {
    this.token = localStorage.getItem('token')!; // #TODO add token security like adbasdaktokensasdakf or encrypt it
  }

  // Returns this.token
  getToken(): string {
    return this.token;
  }

  // Checks if token is not null and checks if it's not expired
  isLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== ''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
    }
    return false;
  }
}
