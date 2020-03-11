import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../model/role';
import { AppMasterService } from '../../../../service/app-master.service';

@Component({
  selector: 'app-restrict-role',
  templateUrl: './restrict-role.component.html'
})
export class RestrictRoleComponent implements OnInit {

  rolelist: Array<Role>;

  constructor(private appMasterService: AppMasterService
  ) { }

  ngOnInit() {
    this.loadAllRole()
  }


  loadAllRole() {
    this.appMasterService.GetAllRole().subscribe((data: any) => {
      this.rolelist = data;
      console.log(this.rolelist)
    }, err => { })
  }

  // editRole(data)

}
