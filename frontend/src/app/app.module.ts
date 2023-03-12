import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'

import { JwtModule } from "@auth0/angular-jwt"
import { HttpClientModule } from "@angular/common/http"

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'
import { MatNativeDateModule } from '@angular/material/core'

import { ROUTES } from './app.routes'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChangePasswordComponent } from './components/change-password/change-password.component'

import { AgePipe } from './pipes/age.pipe'
import { FullNamePipe } from './pipes/full-name.pipe';

import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { DataUsersComponent } from './components/data-users/data-users.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ViewDetailDialogComponent } from './components/view-detail-dialog/view-detail-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component'

import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DataUsersComponent,
    NotFoundComponent,
    ChangePasswordComponent,
    DeleteConfirmationDialogComponent,
    ViewDetailDialogComponent,
    EditDialogComponent,
    AgePipe,
    FullNamePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("access_token"),
        allowedDomains: [environment.apiDomain],
        disallowedRoutes: [environment.apiDomain + '/sign-in']
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
