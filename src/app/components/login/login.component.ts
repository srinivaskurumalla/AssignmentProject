import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{

  loginForm: FormGroup;
  users: any[] = [];

  constructor(private _fb : FormBuilder,private router : Router,private dbService : DbService,private authService : AuthService) {
    this.loginForm = _fb.group({
      Name: '',
      email: '',
      password :''
  })
  }
  ngOnInit(): void {
    this.dbService.getAllUsers().subscribe(
      data  =>{
        this.users = data;
        console.log(this.users);
      },
      error => {
        console.log(error);
    });
  }

  loginFormSubmit() {
    console.log(this.loginForm.value);




    //console.log(this.users);

    for (let user of this.users) {
      if (user.email === this.loginForm.value.email && user.password === this.loginForm.value.password) {
        alert('login successfull')
        this.authService.login(user);
        this.router.navigate(['/payment']);
        this.loginForm.reset(); // Reset the form after a successful login


        
        return; // Exit the loop after a successful login
      }

    }
    alert('login failed');
    this.loginForm.reset(); // Reset the form after a failed login
    this.router.navigate(['/login']);


  }
}
