import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'employees', component: EmployeeListComponent },
  { path: 'create-employee', component: CreateEmployeeComponent},
  { path:'update-employee/:id', component: UpdateEmployeeComponent },
  { path:'employee-details/:username', component: EmployeeDetailsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
