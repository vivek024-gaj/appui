import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMasterRoutingModule } from './app-master-routing.module';

import { GroupComponent } from './group/group.component';
import { ResourceComponent } from './resource/resource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ResourceGroupComponent } from './resource-group/resource-group.component';
import { GlobalModule } from '../modal/global.module';
import { RoleComponent } from './role/role.component';
import { ManageRoleComponent } from './role/manage-role/manage-role.component';
import { RestrictRoleComponent } from './role/restrict-role/restrict-role.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

@NgModule({
  declarations: [ProfileComponent, GroupComponent,
    ResourceComponent, ResourceGroupComponent, RoleComponent, ManageRoleComponent, RestrictRoleComponent, AddUserComponent, ListUserComponent, ProfileComponent],
  imports: [
    CommonModule,
    AppMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    GlobalModule
  ],
})
export class AppMasterModule { }
