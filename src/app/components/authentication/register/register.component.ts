import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['employees']);
    }
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onRegister(employee: Employee): void {

    this.showLoading = true;
    this.subscriptions.push(
      this.authService.register(employee).subscribe(
        (response: Employee) => {
          this.showLoading = false;
          this.snackBar.open(`New account was created for ${response.firstName}.
          Please check your email for password to log in.`, undefined, {
            duration: 3000,
            horizontalPosition: 'end'
          });
        },
        (errorResponse: HttpErrorResponse) => {
          this.snackBar.open(this.capitalizeFirstLetter(errorResponse.error.message), "Dismiss", {
            duration: 3000,
            horizontalPosition: 'end'
          });
          this.showLoading = false;
        }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
