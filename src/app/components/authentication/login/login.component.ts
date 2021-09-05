import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { Employee } from 'src/app/models/employee';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar ) { }



  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['employees']);
    } else {
      this.router.navigate(['login']);
    }
  }

  goToEmployeeList(){
    this.router.navigate(['employees']);
  }

  onLogin(employee: Employee): void {

    this.showLoading = true;
    this.subscriptions.push(
      this.authService.login(employee).subscribe(
        (response: HttpResponse<Employee>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token!); // here is some bug, token is null
          this.authService.addUserToLocalStorage(response.body!);
          this.router.navigateByUrl('/employees')
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          if(errorResponse.message){
            this.snackBar.open(this.capitalizeFirstLetter(errorResponse.error.message), "Dismiss", {
              duration: 3000,
              horizontalPosition: 'end'
            });
          } else {
            this.snackBar.open("An error occured, please try again.", "Dismiss", {
              duration: 3000,
              horizontalPosition: 'end'
            });
          }

          this.showLoading = false;
        }));
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
