import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { AppMasterService } from '../../../service/app-master.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

  groupForm: FormGroup;
  groupList: any = [];
  operationMode = 'add';

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;

  ngOnInit() {
      this.loadGroup();
      this.addgroup();
  }

  constructor(
      public fb: FormBuilder,
      private ngZone: NgZone,
      private router: Router,
      private appMasterService: AppMasterService,
  ) { }

  addgroup() {
      this.groupForm = this.fb.group({
          id: [''],
          name: ['', Validators.required]

      });
  }

  loadGroup() {
      this.appMasterService.GetAllGroup().subscribe((data: any) => {
          this.groupList = data;
      }, err => {
          alert(err);
      });
  }

  submitForm() {
      for (let controller in this.groupForm.controls) {
          this.groupForm.get(controller).markAsTouched();
      }
      if (this.groupForm.invalid) {
          return;
      }
      if (this.operationMode === 'edit') {
          this.updateGroup();
      } else {
          this.addGroup();
      }
  }

  editGroup(data) {
      this.operationMode = 'edit';
      this.groupForm.patchValue(data);
  }

  addGroup() {
      this.appMasterService.addGroup(this.groupForm.value).subscribe((res: any) => {
          this.isSubmitted = true;
          if (res) {
              this.isSuccess = res.success;
              if (res.success) {
                  this.loadGroup();
                  this._statusMsg = res.message;
                  this.groupForm.reset();
                  setTimeout(() => {
                      this.isSubmitted = false;
                      this.isSuccess = false;
                  }, 4000);
              } else {
                  this._statusMsg = res.error;
              }
          }
      }, err => {
          console.log(err);
      });
  }

  updateGroup() {
      this.appMasterService.UpdateGroup(this.groupForm.value.id, this.groupForm.value).subscribe((res: any) => {
          this.isSubmitted = true;
          if (res) {
              this.isSuccess = res.success;
              if (res.success) {
                  this.loadGroup();
                  this._statusMsg = res.message;
                  this.groupForm.reset();
                  this.operationMode = 'add';
                  setTimeout(() => {
                      this.isSubmitted = false;
                      this.isSuccess = false;
                  }, 4000);
              } else {
                  this._statusMsg = res.error;
              }
          }
      }, err => {
          console.log(err);
      });
  }



  deleteFieldValue(data, i) {
      data.index = i;
      this.confirmModal.showModal('Delete Data', 'Do you want to delete this data?', data);
  }

  modalConfirmation(event) {
      console.log(event);
      if (event) {
          this.appMasterService.DeleteGroup(event.id).subscribe((res: any) => {
              this.isSubmitted = true;
              if (res) {
                  this.isSuccess = res.success;
                  if (res.success) {
                      this.groupList.splice(event.index, 1);
                      this._statusMsg = res.message;
                      this.groupForm.reset();
                      setTimeout(() => {
                          this.isSubmitted = false;
                          this.isSuccess = false;
                      }, 4000);
                  } else {
                      this._statusMsg = res.error;
                  }
              }
          }, err => {
              console.log(err);
          });
      }
  }

}
