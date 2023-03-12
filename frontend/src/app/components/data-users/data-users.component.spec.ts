import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { DataUsersComponent } from './data-users.component';

describe('DataUsersComponent', () => {
  let component: DataUsersComponent;
  let fixture: ComponentFixture<DataUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => ''
          },
        }),
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatDialogModule,
      ],
      declarations: [DataUsersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataUsersComponent);
    component = fixture.componentInstance;
    component.keyword = ''
    component.userData = {
      first_name: '',
      last_name: '',
      sex: '',
      date_of_birth: '',
    }
    component.dataSource = [component.userData]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
