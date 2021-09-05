import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../models/custom-http-response';
import { Employee } from '../models/employee';

@Injectable({providedIn: 'root'})
export class EmployeeService {

  private baseURL = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[] | HttpErrorResponse> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employee/list`);
  }

  createEmployee( formData: FormData): Observable<Employee | HttpErrorResponse>{
    return this.httpClient.post<Employee>(`${this.baseURL}/employee/add`, formData);
  }

  updateEmployee( formData: FormData): Observable<Employee | HttpErrorResponse>{
    return this.httpClient.post<Employee>(`${this.baseURL}/employee/update`, formData);
  }

  resetPassword( email: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.httpClient.get<CustomHttpResponse>(`${this.baseURL}/employee/reset-password/${email}`);
  }

  // Gets an username and new image file in formData, returns HttpEvent(upload progress), and Employee instance or error message
  updateProfileImage( formData: FormData): Observable<HttpEvent<Employee> | HttpErrorResponse>{
    return this.httpClient.post<Employee>(`${this.baseURL}/employee/update-profile-image`, formData,
    {
      reportProgress: true, // reporting upload progress
      observe: 'events'
    });
  }

  deleteEmployee( id: number): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.httpClient.delete<CustomHttpResponse>(`${this.baseURL}/employee/delete/${id}`);
  }

  addEmployeesToLocalStorage( employees: Employee[]): void{
    localStorage.setItem('users', JSON.stringify(employees));
  }

  getEmployeesFromLocalStorage( employees: Employee[]):  Employee[]{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users')!);
    }
    return [];
  }

  createEmployeeFormData( loggedInUsername: string, employee: Employee, profileImage: File): FormData{
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', employee.firstName);
    formData.append('lastName', employee.lastName);
    formData.append('jobTitle', employee.jobTitle);
    formData.append('username', employee.username);
    formData.append('email', employee.email);
    formData.append('role', employee.role);
    formData.append('isActive', JSON.stringify(employee.active));
    formData.append('isLocked', JSON.stringify(employee.locked));
    formData.append('profileImage', profileImage);
    return formData;
  }

  getEmployeeByUsername( username: string): Observable<Employee | HttpErrorResponse>{
    return this.httpClient.get<Employee>(`${this.baseURL}/employee/find/${username}`);
  }
}
