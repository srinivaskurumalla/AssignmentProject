import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


import { throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DbService implements OnInit{
  users: any[] = [];
  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    console.log('ngOnInIt called')
    this.getAllUsers().subscribe(
      data  =>{
        this.users = data;
        console.log('this is from db service, getting all user data')
        console.log(this.users);
      },
      error => {
        console.log(error);
    });
  }


  register(data: any): Observable<any> {
    return this.getAllUsers().pipe(
      mergeMap((users: any[]) => {
        var flag: boolean = false;
        for (let user of users) {
          console.log(user.email, data.email);
          if (user.email === data.email) {
            console.log("User exists");
            flag = true;
            break;
          }
        }
        if (flag) {
          return throwError({ status: 409, message: 'User already exists, please try with different email' });
        }
        return this._http.post('http://localhost:3000/users', data);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }









  getAllUsers():  Observable<any>{
    return this._http.get('http://localhost:3000/users');
  }

  savePayment(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/payments', data);
  }
  updatePayment(id : number ,data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/payments/${id}`, data);
  }

  getPaymentById(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/payments/${id}`);
}
  getAllPayments(): Observable<any>{
    return this._http.get('http://localhost:3000/payments');
  }
}
