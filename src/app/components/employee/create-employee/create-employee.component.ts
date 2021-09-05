import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();

  // firstNameControl = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(3),
  // ]);

  // lastNameControl = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(3),
  // ]);

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);


  constructor( private employeeService: EmployeeService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveEmployee(){
    // this.employeeService.createEmployee(this.employee).subscribe( data =>{
    //   this.snackBar.open("New employee was added.", "Dismiss", {
    //     duration: 3000,
    //     horizontalPosition: 'end'
    //   });
    //   this.goToEmployeeList();
    // },
    // error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(){
    this.saveEmployee();
  }
}
