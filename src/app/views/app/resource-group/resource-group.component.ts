import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMasterService } from '../../../service/app-master.service';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-resource-group',
  templateUrl: './resource-group.component.html'
})
export class ResourceGroupComponent implements OnInit {

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

  resourceGroupForm: FormGroup;
  resourceGroupList: any = [];
  operationMode = "add";

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;

  ngOnInit() {
    this.loadResourceGroup();
    this.addresourceGroup();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private appMasterService: AppMasterService,
  ) { }

  addresourceGroup() {
    this.resourceGroupForm = this.fb.group({
      id: [''],
      resourceGroupName: ['', Validators.required],
      menuPlacement: ['', Validators.required]

    })
  }

  loadResourceGroup() {
    this.appMasterService.GetAllResourceGroup().subscribe((data: any) => {
      this.resourceGroupList = data;
    }, err => {
      alert(err)
    })
  }

  submitForm() {
    for (let controller in this.resourceGroupForm.controls) {
      this.resourceGroupForm.get(controller).markAsTouched();
    }
    if (this.resourceGroupForm.invalid) {
      return;
    }
    if (this.operationMode == "edit") {
      this.updateResourceGroup();
    } else {
      this.addResourceGroup();
    }
  }

  editResourceGroup(data) {
    this.operationMode = "edit"
    this.resourceGroupForm.patchValue(data);
  }

  addResourceGroup() {
    this.appMasterService.addResourceGroup(this.resourceGroupForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.loadResourceGroup();
          this._statusMsg = res.message;
          this.resourceGroupForm.reset();
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
    })
  }

  updateResourceGroup() {
    this.appMasterService.UpdateResourceGroup(this.resourceGroupForm.value.id, this.resourceGroupForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.loadResourceGroup();
          this._statusMsg = res.message;
          this.resourceGroupForm.reset();
          this.operationMode = "add";
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
    this.confirmModal.showModal("Delete Data", "Do you want to delete this data?", data);
  }

  modalConfirmation(event) {
    console.log(event);
    if (event) {
      this.appMasterService.DeleteResourceGroup(event.id).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
          this.isSuccess = res.success;
          if (res.success) {
            this.resourceGroupList.splice(event.index, 1);
            this._statusMsg = res.message;
            this.resourceGroupForm.reset();
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
