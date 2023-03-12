import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styleUrls: ['./view-detail-dialog.component.css']
})
export class ViewDetailDialogComponent {
  constructor(public dialogRef: MatDialogRef<ViewDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
