import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { ResourceGroupComponent } from './resource-group/resource-group.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Group'
    },
    children: [
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: 'Group'
        }
      },
      {
        path: 'resource',
        component: ResourceGroupComponent,
        data: {
          title: 'Resource'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMasterRoutingModule { }
