import {AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import {Injectable} from '@angular/core';


// implementing the Validator interface is an OPTIONAL step
@Injectable({ providedIn: 'root' })
export class PasswordMatch implements Validator {

  // here we can also expect a FormGroup or FormControl,
  // but both of these classes extends the AbstractControl class
  validate(control: AbstractControl): ValidationErrors | null {
    // in our case, the control argument will be a FormGroup object
    // the control.value will match the values from the FormControls named 'password, passwordConfirmation'
    const { password, passwordConfirmation } = control.value;

    if (password === passwordConfirmation) {
      // if there is no error we return Null
      return null;
    } else {
      // we just return an object that says what is wrong. Here can be anything, 'passwordMatch' was chosen by Robert
      return {passwordsMatch: false};
    }

  }



}
