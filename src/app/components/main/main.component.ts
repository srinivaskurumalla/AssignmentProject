import { Component , OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  displayedColumns: string[] = ['id', 'userName', 'userEmail', 'billName', 'amount'];
  dataSource!: MatTableDataSource<any>;

  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dbService: DbService, private router : Router,private authService : AuthService) { }

  ngOnInit(): void {
    this.getPaymentList();


  }

  RegisterForm() {
  this.router.navigate(['/register'])
}
  LoginForm() {
    this.router.navigate(['/login'])
  }

  getPaymentList() {
    this.dbService.getAllPayments().subscribe({
      next: (res) => {

        this.getCurrentUser();

        console.log('user detaisl',this.user)
        if (this.user['email'] === 'ADMIN@gmail.com') {


          this.dataSource = new MatTableDataSource(res);
        }
        else {
          const filteredRes = res.filter((val: any) => val.userEmail === this.user['email']);
          this.dataSource = new MatTableDataSource(filteredRes);

        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  getCurrentUser() {
   this.user= this.authService.getCurrentUser();

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

