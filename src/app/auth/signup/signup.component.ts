import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatch} from '../validators/password-match';
import {UniqueUsername} from '../validators/unique-username';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',
      // the second arg of FormControl is a list of SYNCHRONOUS validators
      // the SYNC validators are always checked before the ASYNC validators
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
        ],
      // the third arg of FormControl is a list of ASYNCHRONOUS validators
        [this.uniqueUsernameValidator.validate]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, { validators: [this.passwordMatch.validate]});

  constructor(private passwordMatch: PasswordMatch,
              private uniqueUsernameValidator: UniqueUsername,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);
    this.authService.signup(this.authForm.value).subscribe({
      // if we don't use an arrow function, `this` here will  reference to the subscription, and this is not what we want
      // e.g: `this` like below will reference the subscription in which is used
      // next(response) {
      //   console.log(this);
      // },
      // if we want to use any properties of the current component by using `this`
      // we must use arrow function when we create the below functions so `this` will reference a higher context


      // `this` like below will reference a higher context, in this case the SignupComponent
      next: (response) => {
        console.log(this);
        // navigate to some other route
      },
      complete: () => {
        // we are not doing anything with complete,  but i'm just letting it here for future references to remember that it exists
        console.log('The signup request was completed');
      },
      error: (err) => {
        console.log(err);
        if (err.status === 0) {
          this.authForm.setErrors({noConnection: true});
        }
        else {
          this.authForm.setErrors({unknownError: true});
        }
      }
    });
  }

}
