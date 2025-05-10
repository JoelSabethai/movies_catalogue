import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, EMPTY } from 'rxjs'

import { AuthService } from 'src/app/auth/services/auth.service'

import { environment } from 'src/environments/environment'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add auth header with jwt if user is logged in and request is to the api url
        const jwt = this.authService.getToken() as string;
        const isApiUrl = req.url.startsWith(environment.apiUrl)
        if (jwt && jwt.trim().length && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        } else if(!jwt && !jwt.trim().length) {
            this.router.navigate(['/auth/login']);
            return EMPTY;
        }

        return next.handle(req)
    }
}