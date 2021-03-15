import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  // exporting component so that we can import it in another module
  exports: [
    InputComponent
  ]
})
export class SharedModule { }
