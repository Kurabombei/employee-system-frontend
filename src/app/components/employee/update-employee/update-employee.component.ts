import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number = 0;
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


  constructor( private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // this.employeeService.getEmployeeById(this.id).subscribe(data => {
    //   this.employee = data;
    // }, error => console.log(error));
  }

  updateEmployee(){
    // this.employeeService.updateEmployee(this.id, this.employee)
    // .subscribe( data =>{

    //   this.snackBar.open("This employee was updated.", "Dismiss", {
    //     duration: 3000,
    //     horizontalPosition: 'end'
    //   });

    //   this.employee = new Employee();
    //   this.goToEmployeeList();
    // },
    // error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(){
    this.updateEmployee();
  }

}
