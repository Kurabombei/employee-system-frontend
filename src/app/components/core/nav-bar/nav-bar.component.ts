import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: any;

  private navbarTitleSubject = new BehaviorSubject<string>('Employees');
  navbarTitleAction$ = this.navbarTitleSubject.asObservable();

  constructor( private authService: AuthService, private router: Router) { }

  changeTitle(title: string): void {
    this.navbarTitleSubject.next(title);
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('login');
  }

}
