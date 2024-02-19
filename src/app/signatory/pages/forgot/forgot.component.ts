import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent implements OnInit {
  form!: FormGroup
  step: 'send-email' | 'reset-password' = 'send-email'

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        otp: ['', [Validators.minLength(5)]],
        newPassword: [''],
        confirmPassword: [''],
      },
      { updateOn: 'change' },
    )
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.step === 'send-email') {
        this.sendEmail()
      } else {
        this.resetPassword()
      }
    }
  }

  sendEmail() {
    // send mail using input data
    console.log(this.form.value)

    // move to next step
    this.step = 'reset-password'
  }

  resetPassword() {}
}
