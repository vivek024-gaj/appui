import { Component, OnInit, ViewChild, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent implements OnInit {

  @ViewChild('confirmModal', { static: false }) public confirmModal: ModalDirective;

  @Output('hideModal') hideModal = new EventEmitter<any>();
  title: any;
  message: any;
  inputData: any;

  constructor() { }

  ngOnInit() {
  }

  showModal(title, message, inputData) {
    this.title = title;
    this.message = message;
    this.inputData = inputData;
    this.confirmModal.show();
  }

  hide() {
    this.confirmModal.hide();
    this.hideModal.emit(this.inputData);
  }

}
