import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService, IPaymentDetails } from '../services/payment.service';

@Component({
  selector: 'app-pay-manage-form',
  templateUrl: './pay-manage-form.component.html',
  styleUrls: ['./pay-manage-form.component.css']
})
export class PayManageFormComponent {
  userId: number = 0;

  payForm: FormGroup = new FormGroup({
    cardType: new FormControl(null, [Validators.required]),
    cardNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
    expiry: new FormControl(null, [Validators.required]),
    cvv: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
    firstName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Zא-ת]+$/)]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Zא-ת]+$/)]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{9}$/)])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
    });
  }

  confirmPay() {
    if (this.payForm.invalid) {
      this.payForm.markAllAsTouched();
      return;
    }

    const formValue = this.payForm.value;

    const paymentDetails: IPaymentDetails = {
      cardType: formValue.cardType,
      cardLast4: formValue.cardNumber.slice(-4), // רק 4 ספרות אחרונות נשמרות
      expiry: formValue.expiry,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      nationalId: formValue.nationalId
    };

    this.paymentService.setPaymentDetails(paymentDetails);
    this.router.navigate(['/Finale', this.userId]);
  }
}