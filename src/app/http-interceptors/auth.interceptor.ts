import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes(`${this.authService.baseURL}/employee/login`)){
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.authService.baseURL}/employee/register`)){
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.authService.baseURL}/employee/reset-password`)){
      return httpHandler.handle(httpRequest);
    }
    // #TODO refactor into 1 if
    this.authService.loadToken();
    const token = this.authService.getToken();
    const clonedRequest = httpRequest.clone({setHeaders: { Authorization: `Bearer ${token}` }});
    return httpHandler.handle(clonedRequest);
  }
}
