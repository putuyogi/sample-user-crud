import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formControl: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  disableSubmitButton: boolean = false

  constructor(private formBuilder: FormBuilder,
    private user: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  async onSubmit() {
    if (this.formControl.invalid) return
    console.log(this.formControl.value)

    this.disableSubmitButton = true
    try {
      await this.user.signIn(this.formControl.value)
      this.router.navigate(['']);
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
