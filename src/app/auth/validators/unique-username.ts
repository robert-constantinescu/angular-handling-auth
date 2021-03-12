import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

// the only reason we are adding the @Injectable is to enable this class to use the DependencyInjectionSystem
@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{

  constructor(private httpClient: HttpClient) {
  }

  // by using the arrow function here, we bind the context of the `validate` arrow function
  // to the instance of the class, but why?
  validate = (control: AbstractControl) => {
    const { value } = control;
    // console.log(`this  ${JSON.stringify(this)}`);
    // console.log(this);
    // console.log(this.httpClient);

    return this.httpClient.post<any>(
      'https://api.angular-email.com/auth/username',
      {username: control.value}
    ).pipe(
      map((response) => {
        console.log(response);
        if (response.statusCode) {
          return null;
        }
      }),
      catchError(err => {
        // the catchError must return an Observable
        console.log(err);
        if (err.error.username ) {
          return of({isUniqueUsername: false});
        }
        else {
          return of( {error: err.error, statusCode: err.status});
        }

      })
    );
  }

  // I'm letting this commented here for future reference when it comes about the 'this' in different contexts of JavaScript
  // this in the below will return 'undefined' thus make the call of the method to throw an error, why is doing this?
  // validate (control: AbstractControl) {
  //   const { value } = control;
  //   console.log(this);
  //
  //   console.log(this.httpClient);
  //
  //   return null;
  // }


}
