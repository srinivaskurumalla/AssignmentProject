import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;
  /**
   *
   */
  constructor(private _fb: FormBuilder, private router  : Router,private dbService : DbService,private authService : AuthService) {
    this.paymentForm = _fb.group({
      userName: '',
      userEmail : '',
    courseName: '',
    amount : ''
})
  }

  paymentFormSubmit() {
    console.log(this.paymentForm.value)
    this.paymentForm.value.userName = this.authService.getCurrentUser().Name;
    this.paymentForm.value.userEmail = this.authService.getCurrentUser().email;

    alert('Fee paid successfully');
    this.dbService.savePayment(this.paymentForm.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.router.navigate(['/'])
  }
}
