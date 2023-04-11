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
  }

  logout() {
    // clear the user details
    this.currentUser = null;
  }

  getCurrentUser() {
    // return the current user details
    return this.currentUser;
  }

  isLoggedIn() {
    // check if a user is currently logged in
    return this.currentUser != null;
  }
}
