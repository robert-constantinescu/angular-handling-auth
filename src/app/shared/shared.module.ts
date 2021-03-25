import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [InputComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  // exporting component so that we can import it in another module
  exports: [
    InputComponent, ModalComponent
  ]
})
export class SharedModule { }
