import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular components
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { NavBarComponent } from './components/core/nav-bar/nav-bar.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { SpinnerComponent } from './components/core/spinner/spinner.component';
import { LoginComponent } from './components/authentication/login/login.component';

// angular animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports for material modules
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import { AuthInterceptor } from './http-interceptors/auth.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RegisterComponent } from './components/authentication/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    NavBarComponent,
    FooterComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,

    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // #TODO delete this provider, just checking for preangular spinner
//     {
//     provide: APP_INITIALIZER,
//     useValue:  ()=>new Promise(resolve => {
//       // LOL, this app will never load.
//       //  don't do it in prod!
//       window.setTimeout(resolve, 1000000);
//     }),
//     multi: true
// }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
