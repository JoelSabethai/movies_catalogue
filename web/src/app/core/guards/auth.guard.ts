import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree  } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
) {}

  canActivate(): boolean | UrlTree {
    const token = this.authService.getToken() as string;
    return token && token.trim().length
      ? true
      : this.router.parseUrl('/auth/login'); // redirect if not exist session (token)
  }
}
