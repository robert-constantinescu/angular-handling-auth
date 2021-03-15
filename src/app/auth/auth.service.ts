import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://api.angular-email.com';
  constructor(private http: HttpClient) { }

  usernameAvailable(usernameCheck: string) {
    return this.http.post<UsernameResponse>(`${this.baseUrl}/auth/username`,
      {username: usernameCheck});
  }

}

interface UsernameResponse {
  available: boolean;
}
