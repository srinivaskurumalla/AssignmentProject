import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';


type BillAmounts = {
  [key: string]: number;
};
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent {
  paymentForm: FormGroup;






  billAmounts : BillAmounts = {
    'Electricity': 1000,
    'Water': 500,
    'House Rent': 25000,
    'Bike Insurance': 2000
  };

  billNames: string[] = Object.keys(this.billAmounts);

  /**
   *
   */
  constructor(private _fb: FormBuilder, private router  : Router,private dbService : DbService,private authService : AuthService) {
    this.paymentForm = _fb.group({
      userName: '',
      userEmail : '',
    billName: '',
    amount : ''
})
  }

  paymentFormSubmit() {
    console.log(this.paymentForm.value)
    this.paymentForm.value.userName = this.authService.getCurrentUser().Name;
    this.paymentForm.value.userEmail = this.authService.getCurrentUser().email;
    this.paymentForm.value.amount = this.getSelectedBillAmount();
    alert('Bill paid successfully');
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

  getSelectedBillAmount() {
    const selectedBill = this.paymentForm?.get('billName')?.value ;
    return this.billAmounts[selectedBill];
  }

}
