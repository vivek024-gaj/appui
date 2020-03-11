import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMasterService } from '../../../service/app-master.service';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;


  resourceForm: FormGroup;
  resourceArr: any = [];
  parentResources: any = [];
  resourceFormMode: any = "add";
  subResourceFormMode: any = "add";

  groupList: any;

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;
  subResourceForm: FormGroup;
  resourceGroupList: any;


  ngOnInit() {
    this.addresource();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private appMasterService: AppMasterService,
  ) { this.loadAllResources(); }

  addresource() {
    this.resourceForm = this.fb.group({
      id: [''],
      resourceGroupId: [''],
      resourceName: ['', Validators.required],
      resourceUrl: ['', Validators.required]

    });

    this.subResourceForm = this.fb.group({
      id: [''],
      parentId: [''],
      resourceName: ['', Validators.required],
      // groupId: ['', Validators.required],
      resourceUrl: ['', Validators.required]

    });
  }

  loadAllResources() {
    this.appMasterService.GetAllResource().subscribe(res => {
      this.resourceArr = res;
    });
    this.appMasterService.GetParentsResource().subscribe(res => {
      this.parentResources = res;
    })
    this.appMasterService.GetAllGroup().subscribe((data: any) => {
      this.groupList = data;
    }, err => {
    })
    this.appMasterService.GetAllResourceGroup().subscribe((data: any) => {
      this.resourceGroupList = data;
    }, err => {
    })
  }


  editResource(data) {
    window.scrollTo(0, 0);
    if (data.parentId == 0) {
      this.resourceForm.patchValue(data);
      this.resourceFormMode = "edit";
    } else {
      this.subResourceForm.patchValue(data);
      this.subResourceFormMode = "edit";
    }
  }

  submitForm() {

    for (let controller in this.resourceForm.controls) {
      this.resourceForm.get(controller).markAsTouched();
    }

    if (this.resourceForm.invalid) {
      return;
    }

    // if (this.mode == "edit") {
    //   this.updateResource();
    // } else {
    //   this.addResource();
    // }
  }


  submitResourceForm() {
    for (let controller in this.resourceForm.controls) {
      this.resourceForm.get(controller).markAsTouched();
    }
    if (this.resourceForm.invalid) {
      return;
    }
    if (this.resourceFormMode == "edit") {
      this.updateResource();
    } else {
      this.addResource();
    }
  }


  updateResource() {
    this.appMasterService.UpdateResource(this.resourceForm.value.id, this.resourceForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.loadAllResources();
          this._statusMsg = res.message;
          this.resourceForm.reset();
          this.resourceFormMode = "add";
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


  addResource() {
    this.appMasterService.addResource(this.resourceForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.loadAllResources();
          this._statusMsg = res.message;
          this.resourceForm.reset();
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



  submitSubResourceForm() {
    for (let controller in this.subResourceForm.controls) {
      this.subResourceForm.get(controller).markAsTouched();
    }
    if (this.subResourceForm.invalid) {
      return;
    }
    if (this.subResourceFormMode == "edit") {
      this.updateSubResource();
    } else {
      this.addSubResource();
    }
  }


  addSubResource() {
    this.appMasterService.addResource(this.subResourceForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.loadAllResources();
          this._statusMsg = res.message;
          this.subResourceForm.reset();
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

  updateSubResource() {
    this.appMasterService.UpdateResource(this.subResourceForm.value.id, this.subResourceForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this.loadAllResources();
          this._statusMsg = res.message;
          this.subResourceForm.reset();
          this.subResourceFormMode = "add";
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


  deleteResource(data, i) {
    data.index = i;
    this.confirmModal.showModal("Delete Data", "Do you want to delete this data?", data);
  }

  modalConfirmation(event) {
    console.log(event);
    if (event) {
      this.appMasterService.DeleteResource(event.id).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
          this.isSuccess = res.success;
          if (res.success) {
            this._statusMsg = res.message;
            this.resourceArr.splice(event.index, 1)
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

}
