import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  // the below tells this component that it should expect to receive a label and control property
  // the properties are sent like this:
  // <app-input label="Username" [control]="authForm.get('username')"></app-input>
  @Input() label: string;
  @Input() control: FormControl;


  constructor() { }

  ngOnInit(): void {
  }

}
