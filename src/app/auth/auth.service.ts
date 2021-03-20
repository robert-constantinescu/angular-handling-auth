import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // a BehaviorSubject(defaultValue) will emit the default value to any late subscriber
  // if the .next(anotherValue) method will be called on the BehaviorSubject, all current subscribers and future
  // will receive the last value emitted by the next() method. In this case `anotherValue`
  signedin$ = new BehaviorSubject(false);

  private baseUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {
  }

  usernameAvailable(usernameCheck: string) {
    return this.http
      .post<UsernameResponse>(
        `${this.baseUrl}/auth/username`,
        {username: usernameCheck}
      );
  }

  signup(formValues: SignupForm) {
    return this.http
      .post<SignupResponse>(
        `${this.baseUrl}/auth/signup`,
        formValues,
        // by default the HTTP Client will ignore any cookies received unless we add the below `withCredentials` parameter
        // e.g: Authentication cookies
    // {withCredentials: true} i have added this in an interceptor, but i'm letting it here for future references
      ).pipe(
        // an error coming out of the http observable is going to skip the tap() operator
        // which is what we want, because an error from http observable means that we are probably not signed in
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }


  checkAuthStatus() {
    return this.http
      .get<SignedinResponse>(`${this.baseUrl}/auth/signedin`)
      .pipe(
        tap((resp) => {
          console.log(resp);
          if ( resp.authenticated === true ) {
            this.signedin$.next(true);
          }
        })
      );
  }

  signout() {
    return this.http.post(`${this.baseUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

}

interface UsernameResponse {
  available: boolean;
}

interface SignupForm {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}
