import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { ResourceGroupComponent } from './resource-group/resource-group.component';
import { ResourceComponent } from './resource/resource.component';
import { RoleComponent } from './role/role.component';
import { ManageRoleComponent } from './role/manage-role/manage-role.component';
import { RestrictRoleComponent } from './role/restrict-role/restrict-role.component';
import { ProfileComponent } from './profile/profile.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ACL'
    },
    children: [
      {
        path: 'user',
        redirectTo: 'user'
      },
      {
        path: 'user/list',
        component: ListUserComponent,
        data: {
          title: 'List All Users'
        }
      },
      {
        path: 'user/add-user',
        component: AddUserComponent,
        data: {
          title: 'Add User'
        }
      },
      {
        path: 'user/add-user/:id',
        component: AddUserComponent,
        data: {
          title: 'Add User'
        }
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        data: {
          title: 'User Profile'
        }
      },
      {
        path: 'group',
        redirectTo: 'group'
      },
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: 'Credentials'
        }
      },
      {
        path: 'resource/group',
        redirectTo: 'resource/group'
      },
      {
        path: 'resource/group',
        component: ResourceGroupComponent,
        data: {
          title: 'Resource Group'
        }
      },
      {
        path: 'resources',
        redirectTo: 'resources'
      },
      {
        path: 'resources',
        component: ResourceComponent,
        data: {
          title: 'Resources'
        }
      },
      {
        path: 'role',
        redirectTo: 'role'
      },
      {
        path: 'role',
        component: RoleComponent,
        data: {
          title: 'List All roles'
        }
      },

      {
        path: 'role/manage-role/:id',
        component: ManageRoleComponent,
        data: {
          title: 'Manage role'
        }
      },
      {
        path: 'role/manage-role',
        component: ManageRoleComponent,
        data: {
          title: 'Manage role'
        }
      },
      {


        path: 'role/restrict-role',
        component: RestrictRoleComponent,
        data: {
          title: 'Manage role'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMasterRoutingModule { }
