import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../../_helper/must-match';
import { AppMasterService } from '../../../../service/app-master.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  // operationMode: string;
  rolelist: any;
  editUserId: any;
  mode: any;
  user: any;


  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  _statusMsg: string;

  constructor(public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private appMasterService: AppMasterService) {


    this.createUserForm();


  }
  getChanges() {
    console.log(this.userForm.value)
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required],
      status: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      })
  }

  ngOnInit() {
    this.loadAllRole();
    this.editUserId = this.actRoute.snapshot.paramMap.get('id');

    if (this.editUserId) {

      this.mode = "edit";
      this.appMasterService.GetUser(this.editUserId).subscribe(data => {
        this.user = data;
        this.userForm = this.formBuilder.group({
          id: [],
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          roleId: ['', Validators.required],
          status: ['', Validators.required]
        })

        this.userForm.patchValue(this.user);
      })


    }

  }



  // ngOnChanges(changes: SimpleChanges) {
  //   if (this.mode && this.mode == "edit") {

  //     this.userForm = this.formBuilder.group({
  //       id: [],
  //       name: ['', Validators.required],
  //       email: ['', [Validators.required, Validators.email]],
  //       roleId: ['', Validators.required],
  //       status: ['', Validators.required]
  //     })

  //     this.userForm.patchValue(changes.user.currentValue);
  //   }

  // }

  loadAllRole() {
    return this.appMasterService.GetAllRole().subscribe((data: any) => {
      this.rolelist = data;
    }, err => {
      alert(err)
    })
  }

  submitUserForm() {
    for (let controller in this.userForm.controls) {
      this.userForm.get(controller).markAsTouched();
    }
    if (this.userForm.invalid) {
      return;
    }
    if (this.mode == "edit") {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
  addUser() {
    this.appMasterService.CreateUser(this.userForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this._statusMsg = res.message;
          this.user = {};
          this.mode = "add";
          this.userForm.reset();
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
  updateUser() {
    this.appMasterService.UpdateUser(this.userForm.value.id, this.userForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this._statusMsg = res.message;
          this.user = {};
          this.mode = "add";
          this.userForm.reset();

          this.createUserForm();

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
