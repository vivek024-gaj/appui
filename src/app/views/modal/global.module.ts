// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';




@NgModule({
  imports: [
    CommonModule,

    ModalModule.forRoot()
  ],
  declarations: [
    ConfirmationModalComponent
],
  exports: [ConfirmationModalComponent]
})
export class GlobalModule { }
