import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    } else {
      console.log('ELSE: ', this.signinForm.value);
      // always REMEMBER TO SUBSCRIBE TO OBSERVABLES so that they will emit values
      this.authService.signin(this.signinForm.value).subscribe(() => {});
    }

  }
}
