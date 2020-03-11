import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }

            if (err.status === 0) {
                err.error = {};
                err.error.status = err.status;
                err.error.success = false;
                err.error.error = 'Server Unavailable!';
                this.router.navigateByUrl('error/' + JSON.stringify(err.error));
            } else if (err.status === 403) {
                err.error.status = err.status;
                this.router.navigateByUrl('error/' + JSON.stringify(err.error));
            } else if (err.status === 500) {
                this.router.navigateByUrl('500');
            } else if (err.error && (err.error.errorCode = 'CDTERR-006')) {
                err.error.status = err.status;
                this.router.navigateByUrl('error/' + JSON.stringify(err.error).replace(/\//g, ','));
            } else {
                if (!err.error) {
                    err.error = err;
                }
            }
            return throwError(err.error);
        }));
    }
}
