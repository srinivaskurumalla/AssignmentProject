import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AssignmentProject';

  loggedInName: string | null = '';

  /**
   *
   */
  constructor(private router: Router,private authservice : AuthService) {


  }
  RegisterForm() {
    this.router.navigate(['/register'])
  }
  LoginForm() {
    this.router.navigate(['/login'])

  }

  isLoggedIn(): boolean{
    this.loggedInName = localStorage.getItem('loggedInName');
   return this.authservice.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('loggedInName')
    this.authservice.logout();
    this.router.navigate(['/'])
  }
}
