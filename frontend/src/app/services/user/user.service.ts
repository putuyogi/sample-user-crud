import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService, private auth: AuthService) { }

  async signIn(data: any) {
    const response = await firstValueFrom(this.http.post('/sign-in', data))
    this.auth.setAuthenticationData(response)
  }

  async register(data: any) {
    const response = await firstValueFrom(this.http.post('/users', data))
  }

  async changePassword(id: string, data: any) {
    const response = await firstValueFrom(this.http.post('/change-password/' + id, data))
  }

  async getData(limit: number, page: number, keyword: string) {
    return await firstValueFrom(this.http.get(`/users?limit=${limit}&page=${page}&keyword=${keyword}`))
  }

  async deleteData(id: string) {
    return await firstValueFrom(this.http.delete(`/users/${id}`))
  }

  async updateData(id: string, data: any) {
    return await firstValueFrom(this.http.put(`/users/${id}`, data))
  }
}
