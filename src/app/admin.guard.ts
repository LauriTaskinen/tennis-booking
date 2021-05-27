import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService} from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.user?.id ) {
      console.log('no guard');
      return true;
    } else {
      this.router.navigate(['login']);
      console.log('guard');
      return false;
    }
  }
}
