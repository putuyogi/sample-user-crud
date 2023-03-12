import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = environment.apiBaseUrl

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
    return this.http.get(this.baseURL + url, { headers: this.header })
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.baseURL + url, { headers: this.header })
  }

  post(url: string, requestBody: any): Observable<any> {
    return this.http.post(this.baseURL + url, requestBody, { headers: this.header })
  }

  put(url: string, requestBody: any): Observable<any> {
    return this.http.put(this.baseURL + url, requestBody, { headers: this.header })
  }
}
