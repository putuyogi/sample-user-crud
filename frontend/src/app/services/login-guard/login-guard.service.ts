import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // This will prevent user to open "Login" and "Register" if they are already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
