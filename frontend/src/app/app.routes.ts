import { Routes } from "@angular/router";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { DataUsersComponent } from "./components/data-users/data-users.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard/auth-guard.service';
import { LoginGuardService } from "./services/login-guard/login-guard.service";

export const ROUTES: Routes = [
  {
    path: '',
    component: DataUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  },
];