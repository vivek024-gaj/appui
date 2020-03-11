import {Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { navItems } from '../../_nav';
import { User } from '../../model/user';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {



  public navItems = navItems;
  public sidebarMinimized = false;
  private changes: MutationObserver;
  public element: HTMLElement;
  currentUser: User;
  notificationCount: any;
  notification: Notification;


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(DOCUMENT) _document?: any,
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.navItems = JSON.parse(sessionStorage.getItem('nav'));
    });
  }
  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
