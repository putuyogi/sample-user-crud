import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formControl: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    sex: new FormControl(''),
    date_of_birth: new FormControl(''),
    address: new FormControl('')
  })

  disableSubmitButton: boolean = false

  constructor(private formBuilder: FormBuilder,
    private user: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      sex: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      address: ['']
    })
  }

  async onSubmit() {
    if (this.formControl.invalid) return
    console.log(this.formControl.value)

    this.disableSubmitButton = true
    try {
      this.formControl.value.date_of_birth = moment(this.formControl.value.date_of_birth).format("YYYY-MM-DD")
      console.log(this.formControl.value)
      await this.user.register(this.formControl.value)
      this.formControl.reset()
      this.snackBar.open('User registered successfully. You can use your credential to use sign in to the system.', 'Close', {
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
