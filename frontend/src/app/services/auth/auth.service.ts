import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    // Check if token is preserved in local storage and it is not expired
    const token = this.getToken()
    if (token === null) return false
    return !this.jwtHelper.isTokenExpired(token)
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  setAuthenticationData(data: any): void {
    localStorage.setItem('auth_data', JSON.stringify(data))
    localStorage.setItem('access_token', data.token)
  }

  clearAuthenticationData(): void {
    localStorage.removeItem('auth_data')
    localStorage.removeItem('access_token')
  }

  getAuthData(): any {
    return JSON.parse(localStorage.getItem('auth_data')!)
  }
}
