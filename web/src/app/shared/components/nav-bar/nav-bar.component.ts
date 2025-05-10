import { Component, HostBinding, ElementRef, HostListener, ViewChild } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @HostBinding('class') class = 'fixed top-0 z-50 w-full';

  isMobileMenuOpen: boolean = false;
  isProfileMenuOpen: boolean = false;

  @ViewChild('userMenuButton', { static: false }) userMenuButton!: ElementRef;
  @ViewChild('userDropdown', { static: false }) userDropdown!: ElementRef;

  constructor(private authService: AuthService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log(this.isProfileMenuOpen);
  }

  logOut(): void {
    this.authService.logOut();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const clickedInsideButton = this.userMenuButton?.nativeElement.contains(target);
    const clickedInsideDropdown = this.userDropdown?.nativeElement.contains(target);

    if (!clickedInsideButton && !clickedInsideDropdown) {
      this.isProfileMenuOpen = false;
    }
  }
}
