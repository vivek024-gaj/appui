import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizeService {

  currentUser: any;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  canDelete() {
    return false;
  }

  canEdit() {
    return (this.currentUser.roleId == 1 || this.currentUser.roleId == 2 || this.currentUser.roleId == 3 || this.currentUser.roleId == 4)
  }

  canPrimaryApprove() {
    return (this.currentUser.roleId == 1 || this.currentUser.roleId == 3)
  }
  canFinalize() {
    return (this.currentUser.roleId == 1 || this.currentUser.roleId == 2)
  }

  canReject() {
    return (this.currentUser.roleId == 1 || this.currentUser.roleId == 2 || this.currentUser.roleId == 3)
  }
}
