import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { ResourceGroupComponent } from './resource-group/resource-group.component';
import { ResourceComponent } from './resource/resource.component';
import { RoleComponent } from './role/role.component';
import { ManageRoleComponent } from './role/manage-role/manage-role.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ACL'
    },
    children: [
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
          title: 'Role'
        }
      },
      {
        path: 'role/manage-role',
        component: ManageRoleComponent,
        data: {
          title: 'Manage Role'
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
