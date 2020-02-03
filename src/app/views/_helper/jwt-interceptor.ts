import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Router , RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;

        // console.log("Current User: "+currentUser);

        if(!this.authenticationService.isUserLoggedIn) {
            this.authenticationService.logout();
            // this.router.navigate(['/login']);
        }

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        //add allow origin
        request = request.clone({
            setHeaders: {
                'Allow-Origin' : environment.allowOrigin,
                'Access-Control-Allow-Origin' : environment.allowOrigin,
            }
        });

        // console.log("REQ Allow-Origin: "+request.headers.get('Allow-Origin'));
        // console.log("REQ Access-Control-Allow-Origin: "+request.headers.get('Access-Control-Allow-Origin'));
        // console.log("REQ Authorization: "+request.headers.get('Authorization'));
        // console.log("URL : "+request.url);

        return next.handle(request);
    }
}
