import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { LoginData } from '../logindata'; // otetaan sisään testikäyttäjän tunnnus ja salasana

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logIn() {
    this.router.navigate(['/booking']);
  }

  signIn() {
    this.router.navigate(['/sign-in'])
  }
}
