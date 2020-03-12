import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../../../modal/confirmation-modal/confirmation-modal.component';
import { AppMasterService } from '../../../../service/app-master.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit {

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;


  UserList: any = [];
  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  _statusMsg: string;
  showEditUserForm: boolean;
  user: any;
  mode: string = "add";
  showAddUserForm: boolean;




  ngOnInit() {
    this.loadAllUsers();
  }

  constructor(
    public appMasterService: AppMasterService
  ) { }

  // Users list
  loadAllUsers() {
    return this.appMasterService.GetAllUser().subscribe((data: {}) => {
      this.UserList = data;
    }, err => {
      this._statusMsg = err.error;

    })
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  // // Delete User
  // deleteUser(data) {

  //   if (confirm("Are you sure to delete " + data.name)) {
  //     var index = index = this.UserList.map(x => { return x.id }).indexOf(data.id);
  //     return this.userService.DeleteUser(data.id).subscribe(res => {
  //       this.isSubmitted = true;
  //       if (res) {
  //         this.UserList.splice(index, 1)
  //         console.log('User deleted!')
  //         this.isSuccess = res.success;
  //         if (res.success) {
  //           this._statusMsg = res.message;
  //           this.delay(4000).then(any => {
  //             this.isSubmitted = false;
  //             this.isSuccess = false;
  //           });
  //         } else {
  //           this._statusMsg = res.error;
  //         }
  //       }
  //     })
  //   }
  // }


  deleteUser(data) {
    var index = this.UserList.map(x => { return x.id }).indexOf(data.id);

    data.index = index;
    this.confirmModal.showModal("Delete Data", "Are you sure to delete " + data.name, data);
  }

  modalConfirmation(event) {
    console.log(event);
    if (event) {
      this.isSubmitted = true;

      return this.appMasterService.DeleteUser(event.id).subscribe(res => {
        if (res) {
          this.UserList.splice(event.index, 1)
          console.log('User deleted!')
          this.isSuccess = res.success;
          if (res.success) {
            this._statusMsg = res.message;
            this.delay(4000).then(any => {
              this.isSubmitted = false;
              this.isSuccess = false;
            });
          } else {
            this._statusMsg = res.error;
          }
        }
      }, err => {
        this._statusMsg = err.error;

      })
    }
  }





  editUser(user) {
    this.showEditUserForm = true;
    this.showAddUserForm = false;

    this.user = user;
    this.mode = "edit";
  }


}
