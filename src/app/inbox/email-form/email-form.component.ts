import {Component, Input, OnInit} from '@angular/core';
import {Email} from '../email';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Input() email: Email;
  createEmailForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text} = this.email;
    this.createEmailForm = new FormGroup({
      to: new FormControl(to),
      from: new FormControl(from),
      subject: new FormControl(subject),
      text: new FormControl(text)
    });
  }

}
