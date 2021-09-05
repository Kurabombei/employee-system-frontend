import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  username: string = "";
  employee: Employee = new Employee();

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];

    this.employee = new Employee();
    this.employeeService.getEmployeeByUsername(this.username).subscribe( (data:any) => {
      this.employee = data;
    },
    (errorResponse: HttpErrorResponse) => {
      this.snackBar.open(this.capitalizeFirstLetter(errorResponse.error.message), "Dismiss", {
        duration: 2000,
        horizontalPosition: 'end'
      });
  });
  }

  // TODO refactor this into a different service with notifications
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
