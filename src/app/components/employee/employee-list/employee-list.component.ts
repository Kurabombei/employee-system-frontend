import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements AfterViewInit {

  isLoading = false;
  employees: Employee[] = [];
  subscriptions: Subscription[] = [];
  dataSource = new MatTableDataSource<Employee>(this.employees);

  displayedColumns: string[] = ['profileImage', 'firstName', 'lastName','jobTitle', 'email','active','locked', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private employeeService: EmployeeService, private router: Router, private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getEmployees(true);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getEmployees(showNotification: boolean): void{
    this.isLoading = true;
    this.subscriptions.push(
      this.employeeService.getEmployeesList().subscribe(
        (data: any) => {
          this.dataSource.data = data;
          this.employeeService.addEmployeesToLocalStorage(data);
          this.isLoading = false;
          if(showNotification){
            this.snackBar.open(`${data.length} user(s) loaded successfully.`, "Dismiss", {
              duration: 1500,
              horizontalPosition: 'end'
            });
          }
      },
      (errorResponse: HttpErrorResponse) => {
        this.snackBar.open(this.capitalizeFirstLetter(errorResponse.error.message), "Dismiss", {
          duration: 2000,
          horizontalPosition: 'end'
        });
        this.isLoading = false;
      }));
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      this.snackBar.open("This employee was deleted.", "Undo", {
        duration: 2000,
        horizontalPosition: 'end'
      });
      this.getEmployees(false);
    })
  }
  showEmployeeDetails(username: string){
    this.router.navigate(['employee-details', username]);
  }

  // TODO refactor this into a different service with notifications
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
