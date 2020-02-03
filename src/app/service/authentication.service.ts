import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { NavData } from '../_nav';

export class JwtResponse {
  constructor(
    public jwttoken: string,
     ) {}
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {authenticateUrl: string = environment.apiUrl + '/authenticate';
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;

constructor(
  private httpClient: HttpClient
  ) {
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

login(username: string, password: string) {
  return this.httpClient.post<any>(this.authenticateUrl, { username, password })
    .pipe(map(dataMap => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if (dataMap.user) {
      sessionStorage.setItem('currentUser', JSON.stringify(dataMap.user));
      let tokenStr = 'Bearer ' + dataMap.user.token;
      sessionStorage.setItem('token', tokenStr);

      let navMenu : NavData[] = [];
      for (let key in dataMap.nav) {
        let menuItem = dataMap.nav[key];
        for (let ckey in menuItem['children']) {
          let subMenuItem = menuItem['children'][ckey]
          delete subMenuItem['children']
        }
        navMenu.push(menuItem);
      }
      sessionStorage.setItem('nav', JSON.stringify(navMenu));
      console.log("setting nav in session");

      this.currentUserSubject.next(dataMap.user);
      return dataMap.user;
    } else {
      return dataMap;
    }
  }));
}

isUserLoggedIn() {
  let user = sessionStorage.getItem('currentUser');
  //console.log(!(user === null))
  return !(user === null)
}

logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('nav');
  this.currentUserSubject.next(null);
}
}
