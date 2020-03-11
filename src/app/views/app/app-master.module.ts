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

@NgModule({
  declarations: [ProfileComponent, GroupComponent,
    ResourceComponent, ResourceGroupComponent, RoleComponent, ManageRoleComponent],
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
