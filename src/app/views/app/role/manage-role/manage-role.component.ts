import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NgForm, FormArray, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from '../../../modal/confirmation-modal/confirmation-modal.component';
import { AppMasterService } from '../../../../service/app-master.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html'
})
export class ManageRoleComponent implements OnInit {

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;


  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;

  manageRoleForm: FormGroup;
  manageRoleArr: any = [];
  rolelist: any;
  resourceList: any;
  subResourceList: any;
  groupList: any;
  resourceGroupList: any;

  editRoleId: any
  subResourceIdList: any = [];
  constructor(
    public fb: FormBuilder,
    private appMasterService: AppMasterService,
    private actRoute: ActivatedRoute,

  ) { this.manageRole(); this.loadData(); }

  ngOnInit() {
    this.editRoleId = this.actRoute.snapshot.paramMap.get('id');
  }


  loadData() {
    this.appMasterService.GetAllRole().subscribe((data: any) => {
      this.rolelist = data;
      if (this.editRoleId) {
        this.manageRoleForm.patchValue({ roleId: this.editRoleId });
        this.getManageRoleList();
      }
    }, err => {
    })

    this.appMasterService.GetParentsResource().subscribe((data: any) => {
      this.resourceList = data;
    }, err => {
    })

    this.appMasterService.GetAllGroup().subscribe((data: any) => {
      this.groupList = data;
      for (let group of this.groupList) {
        const control = new FormControl(); // if first item set to true, else false
        (this.manageRoleForm.controls.group as FormArray).push(control);
      }
    }, err => {
    })
    this.appMasterService.GetAllResourceGroup().subscribe((data: any) => {
      this.resourceGroupList = data;
      console.log('GetAllResourceGroup', this.resourceGroupList);
    }, err => {
      console.log('GetAllResourceGroup', err);
    })
  }

  getSubResource() {
    this.appMasterService.GetAllSubResourceById(this.manageRoleForm.value.resourceId).subscribe((data: any) => {
      this.subResourceList = data;
      this.manageRoleForm.controls.subResourceId = new FormArray([]);
      this.subResourceIdList = [];
      for (let subRes of this.subResourceList) {
        let control: any = new FormControl(); // if first item set to true, else false
        (this.manageRoleForm.controls.subResourceId as FormArray).push(control);
      }

    }, err => {
    })
  }

  // loadManageRoleArr() {
  //   this.manageRoleService.GetAllManageRole().subscribe((data: any) => {
  //     this.manageRoleArr = data;
  //   }, err => {
  //   })
  // }

  getManageRoleList() {
    this.appMasterService.GetAllManageRoleByRoleId(this.manageRoleForm.value.roleId).subscribe((data: any) => {
      this.manageRoleArr = data;
    }, err => { })

  }


  manageRole() {

    this.manageRoleForm = this.fb.group({
      id: [''],
      roleId: ['', Validators.required],
      resourceId: [''],
      // resourceGroupId: [''],
      subResourceId: new FormArray([]),
      group: new FormArray([]),
      // resourceGroup: new FormArray([]),
      groupId: [''],

    })

  }

  test(subRes, id) {
    if (subRes.value) {
      this.subResourceIdList.push(id);
    } else {
      this.subResourceIdList.splice(this.subResourceIdList.indexOf(id), 1)
    }
  }

  submitForm(val) {

    let ManageRoleList = [];
    for (let controller in this.manageRoleForm.controls) {
      this.manageRoleForm.get(controller).markAsTouched();
    }
    if (this.manageRoleForm.invalid) {
      return;
    }
    const selectedGroupIds = this.manageRoleForm.value.group.map((v, i) => v ? this.groupList[i].id : null)
      .filter(v => v !== null);
    let selectedSubResources = this.manageRoleForm.value.subResourceId.map((v, i) => v ? this.subResourceList[i].id : null)
      .filter(v => v !== null);

    if (selectedSubResources && selectedSubResources.length > 0) { } else {
      selectedSubResources = this.subResourceIdList;
    }


    for (let id in selectedSubResources) {
      let manageRole: any = {};
      manageRole.groupId = "";
      manageRole.id = "";
      manageRole.resourceId = selectedSubResources[id]
      manageRole.roleId = this.manageRoleForm.value.roleId
      ManageRoleList.push(manageRole);
    }


    for (let id in selectedGroupIds) {

      let manageRole: any = {};
      manageRole.groupId = selectedGroupIds[id];
      manageRole.id = "";
      manageRole.resourceId = "";
      manageRole.roleId = this.manageRoleForm.value.roleId

      ManageRoleList.push(manageRole);
    }

    if (ManageRoleList && ManageRoleList.length > 0) {
      this.appMasterService.addListManageRole(ManageRoleList).subscribe((res: any) => {
        console.log('res', res);
        this.isSubmitted = true;
        if (res) {
          this.isSuccess = res.success;
          if (res.success) {
            this.editRoleId = this.manageRoleForm.value.roleId;
            this.manageRoleForm.reset();
            this.manageRoleForm.patchValue({ roleId: this.editRoleId });
            this.getManageRoleList();
            this._statusMsg = res.message;
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

  getGroupDisable(id) {
    let result = false;
    for (let item of this.manageRoleArr) {
      if (item.groupID == id) {
        return true;
      }
    }
    return result;
  }


  getsubResourceDisable(id) {
    let result = false;
    for (let item of this.manageRoleArr) {
      if (item.resourceID == id) {
        return true;

      }
    }
    return result;
  }


  deleteFieldValue(data, i) {
    data.index = i;
    this.confirmModal.showModal("Delete Data", "Do you want to delete this data?", data);
  }

  modalConfirmation(event) {
    console.log(event);
    if (event) {
      this.appMasterService.DeleteManageRole(event.id).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
          this.isSuccess = res.success;
          if (res.success) {
            this.editRoleId = this.manageRoleForm.value.roleId;
            this.manageRoleForm.reset();
            this.manageRoleForm.patchValue({ roleId: this.editRoleId });
            this.getManageRoleList();
            this._statusMsg = res.message;
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
