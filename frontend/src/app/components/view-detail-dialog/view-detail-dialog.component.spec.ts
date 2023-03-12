import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgePipe } from 'src/app/pipes/age.pipe';

import { ViewDetailDialogComponent } from './view-detail-dialog.component';

describe('ViewDetailDialogComponent', () => {
  let component: ViewDetailDialogComponent;
  let fixture: ComponentFixture<ViewDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ViewDetailDialogComponent,
        AgePipe
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }, {
          provide: MatDialogRef,
          useValue: {}
        }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
