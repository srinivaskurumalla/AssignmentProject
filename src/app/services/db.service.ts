import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private _http: HttpClient) { }

  register(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/users', data);
  }

  getAllUsers():  Observable<any>{
    return this._http.get('http://localhost:3000/users');
  }

  savePayment(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/payments', data);
  }

  getAllPayments(): Observable<any>{
    return this._http.get('http://localhost:3000/payments');
  }
}
