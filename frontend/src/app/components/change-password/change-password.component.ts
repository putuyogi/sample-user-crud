import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  formControl: FormGroup = new FormGroup({
    current_password: new FormControl(''),
    new_password: new FormControl(''),
    retype_new_password: new FormControl('')
  })

  disableSubmitButton: boolean = false
  userData: any = {}

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.userData = this.auth.getAuthData()
  }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      retype_new_password: ['', Validators.required],
    })
  }

  async onSubmit() {
    if (this.formControl.invalid) return
    console.log(this.formControl.value)

    this.disableSubmitButton = true
    try {
      await this.user.changePassword(this.userData.id, this.formControl.value)
      this.snackBar.open('Password changed successfully', 'Close', {
        duration: 3000
      });
    } catch (ex: any) {
      const message = (ex.error?.statusCode !== undefined)
        ? ex.error?.message
        : ex.message
      this.snackBar.open(message, 'Close', {
        duration: 3000
      });
    }
    this.disableSubmitButton = false
  }
}
