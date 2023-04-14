import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private router: Router,
    private dbService: DbService,
    private _coreService : CoreService) {
    this.registerForm = _fb.group({
      Name: '',
      email: '',
      phone:'',
      password :''
  })
  }

  registerFormSubmit() {
    console.log(this.registerForm.value);
    this.dbService.register(this.registerForm.value).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Registered Successfully!')
        this.router.navigate(['/login'])
      },
      error : (err : any) => {
        alert(err.message)
      }
    })
  }
}
