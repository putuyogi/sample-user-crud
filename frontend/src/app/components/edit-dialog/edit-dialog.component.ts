import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
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
    public dialogRef: MatDialogRef<ViewDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formControl = this.formBuilder.group({
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name],
      email: [data.email, [Validators.email, Validators.required]],
      password: [data.password, Validators.required],
      sex: [data.sex, Validators.required],
      date_of_birth: [data.date_of_birth, Validators.required],
      address: [data.address]
    })
  }

  onSubmit() {
    if (this.formControl.invalid) return
    console.log(this.formControl.value)
    this.dialogRef.close(this.formControl.value)
  }
}
