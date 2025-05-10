import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(err => {
                    if ([401, 403].includes(err.status)) {
                        // Auto logout if 401 or 403 response returned from api
                        sessionStorage.clear();
                        this.router.navigate(['/auth/login']);
                    }

                    const error = (err && err.error && err.error.message) || err.statusText;
                    return throwError(error);
                })
            )
    }
}