import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../../model/role';
import { Router } from '@angular/router';
import { AppMasterService } from '../../../service/app-master.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

  roleForm: FormGroup;
  roleArr: any = [];
  rolelist: Array<Role>;
  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;


  operationMode: String = "add";
  roleIndex: Number;

  ngOnInit() {
      this.addrole();
      this.loadAllRole();
  }

  constructor(
      public fb: FormBuilder,
      private ngZone: NgZone,
      private router: Router,
      private appMasterService: AppMasterService

  ) { }

  loadAllRole() {
      return this.appMasterService.GetAllRole().subscribe((data: any) => {
          this.rolelist = data;
      }, err => {
          // alert(err)
      })
  }

  addrole() {
      this.roleForm = this.fb.group({
          id: [],
          name: ['', [Validators.required, Validators.maxLength(25)]],
          description: ['', Validators.required]

      })
  }

  editRole(role) {
      this.roleForm.patchValue(role);
      this.operationMode = "edit";

  }

  deleteFieldValue(data, i) {
      data.index = i;
      this.confirmModal.showModal("Delete Data", "Do you want to delete this data?", data);
  }

  modalConfirmation(event) {
      console.log(event);
      if (event) {
          this.appMasterService.DeleteRole(event.id).subscribe((res: any) => {
              this.isSubmitted = true;
              if (res) {
                  this.isSuccess = res.success;
                  if (res.success) {
                      this.rolelist.splice(event.index, 1)
                      this._statusMsg = res.message;
                      this.roleForm.reset();
                      setTimeout(() => {
                          this.isSubmitted = false;
                          this.isSuccess = false
                      }, 4000)
                  } else {
                      this._statusMsg = res.error;
                  }
              }
          }, err => {
              console.log(err);
          })
      }
  }

  submitForm() {

      for (let controller in this.roleForm.controls) {
          this.roleForm.get(controller).markAsTouched();
      }
      if (this.roleForm.invalid) {
          return;
      } else {
          if (this.operationMode == "edit") {
              this.updateRole();

          } else {
              this.addNewRole();
          }
      }
  }

  addNewRole() {
      this.appMasterService.addRole(this.roleForm.value).subscribe((res: any) => {
          this.isSubmitted = true;
          if (res) {
              this.isSuccess = res.success;
              if (res.success) {
                  this.loadAllRole();
                  this._statusMsg = res.message;
                  this.roleForm.reset();
                  setTimeout(() => {
                      this.isSubmitted = false;
                      this.isSuccess = false
                  }, 4000)
              } else {
                  this._statusMsg = res.error;
              }
          }
      }, err => {
          console.log(err); this.loadAllRole();
      })
  }

  updateRole() {
      this.appMasterService.UpdateRole(this.roleForm.value.id, this.roleForm.value).subscribe((res: any) => {
          this.isSubmitted = true;
          if (res) {
              this.isSuccess = res.success;
              if (res.success) {
                  this.loadAllRole();
                  this._statusMsg = res.message;
                  this.roleForm.reset();
                  this.operationMode = "add";
                  setTimeout(() => {
                      this.isSubmitted = false;
                      this.isSuccess = false
                  }, 4000)
              } else {
                  this._statusMsg = res.error;
              }
          }
      }, err => {
          console.log(err);
      })
  }

  test(aaa) {
      console.log(aaa.errors);
      console.log(aaa.hasError())
  }

}
