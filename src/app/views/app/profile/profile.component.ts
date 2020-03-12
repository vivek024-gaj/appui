import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user';
import { AppMasterService } from '../../../service/app-master.service';
import { AuthenticationService } from '../../../service/authentication.service';
import { MustMatch } from '../../_helper/must-match';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  userList: any = [];
  updateUserForm: FormGroup;
  changePasswordForm: FormGroup;

  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  isSuccessP: boolean = false;
  _statusMsg : string;
  user: User;

  ngOnInit() {
   
  }

  constructor(
    private actRoute: ActivatedRoute,
    public appMasterService: AppMasterService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    
     this.user = authenticationService.currentUserValue;
     console.log("User:"+this.user.email);
     
     this.updateUserForm = this.fb.group({
      userName: [this.user.name, Validators.required],
      email: new FormControl({value: this.user.email, disabled: true}, Validators.required),
      role: new FormControl({value: this.user.role, disabled: true}, Validators.required),
      status: new FormControl({value: this.user.status, disabled: true}, Validators.required),
    })

     this.buildChangePasswordForm();

  }


  buildChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      id: ['', Validators.required],
      old_pass: ['',Validators.required],
      new_pass: ['',Validators.required],
      conf_pass: ['',Validators.required],
    },{
      validator: MustMatch('new_pass', 'conf_pass')
    })
  }

  get passwordForm (){
    return this.changePasswordForm.controls;
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  submitUpdateForm(){ 

    for(let controller in this.updateUserForm.controls){
      this.updateUserForm.get(controller).markAsTouched();
    }
  
    if(this.updateUserForm.invalid){
      return;
    }

    // var id = this.actRoute.snapshot.paramMap.get('id');
    var id = this.user.id;
    this.appMasterService.UpdateUserName(id, this.updateUserForm.value.userName).subscribe(res => {
      this.isSubmitted = true;
     
      if(res){
        this.isSuccess = res.success;
        if(res.success){
          this._statusMsg = res.message;
          this.updateUserForm.reset();

          this.delay(4000).then(any => {
              this.isSubmitted = false;
              this.isSuccess = false;
            });
        }else{
          this._statusMsg = res.error;
        }
      }
    })
  }


  submitPasswordForm(){

  }
}
