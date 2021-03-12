import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatch} from '../validators/password-match';
import {UniqueUsername} from '../validators/unique-username';

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
              private uniqueUsernameValidator: UniqueUsername) { }

  ngOnInit(): void {
  }

}
