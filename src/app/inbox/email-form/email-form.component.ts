import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Email} from '../email';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();

  createEmailForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text} = this.email;
    this.createEmailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      /**
       * This is only for the from - FormControl
       * we pass an object as the default state instead of a propery to be able to mark the `from` field as disabled and not let users edit it
       *
       * the DOWNSIDE is:
       *    - when we pass the disable property angular, by default, WILL JUST DROP this control from the form
       *
       * e.g:
       *  If we do: `console.log(this.createEmailForm.value);` the 'FROM' FormControl will be missing from the values,
       *  we will have only: TO, SUBJECT, TEXT
       *
       *  To get all the FormControls we would use console.log(this.createEmailForm.getRawValue());
       */
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    });
  }

  onSubmit() {
    if (this.createEmailForm.invalid) {
      return;
    }
    this.emailSubmit.emit(this.createEmailForm.value);
  }

}
