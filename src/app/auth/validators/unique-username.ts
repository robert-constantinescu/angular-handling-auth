import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from '../auth.service';

// the only reason we are adding the @Injectable is to enable this class to use the DependencyInjectionSystem
@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{

  constructor(private authService: AuthService) {
  }

  // by using the arrow function here, we bind the context of the `validate` arrow function
  // to the instance of the class, but why?
  validate = (control: AbstractControl) => {
    const {value} = control;
    // console.log(`this  ${JSON.stringify(this)}`);
    // console.log(this);
    // console.log(this.httpClient);

    return this.authService.usernameAvailable(value)
      .pipe(
        map((response) => {
          // console.log(response);
          if (response.available) {
            return null;
          }
        }),
        catchError(err => {
          // the catchError must return an Observable
          console.log(err);
          if (err.error.username) {
            return of({isUniqueUsername: false});
          } else {
            return of({error: err.error, statusCode: err.status});
          }
        })
      );
  };

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
