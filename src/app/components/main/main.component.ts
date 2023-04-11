import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor( private dbService: DbService,private router : Router) { }

  ngOnInit(): void {

  }

  RegisterForm() {
  this.router.navigate(['/register'])
}
  LoginForm() {
    this.router.navigate(['/login'])
  }



}

