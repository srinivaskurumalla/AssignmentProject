import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

  constructor() { }


  login(user: any) {
    // authenticate the user and store the user details in currentUser
    this.currentUser = user;

   // console.log('this is current user',this.currentUser)
  }

  logout() {
    // clear the user details
    localStorage.removeItem('loggedInName');
    this.currentUser = null;

  }

  getCurrentUser() {
    // return the current user details
    console.log('from current user method',this.currentUser);
    return this.currentUser;
  }

  isLoggedIn() : boolean {
    // check if a user is currently logged in
    return this.currentUser != null;
  }
}
