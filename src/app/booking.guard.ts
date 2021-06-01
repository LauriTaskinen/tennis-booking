import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class BookingGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private localstorage: LocalstorageService
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.authorized || this.localstorage.currentUserID) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
