import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService,) {}

  ngOnInit(): void {}

  signIn() {
    this.router.navigate(['/sign-in']);
  }

  logIn(data: NgForm) {
    if (this.auth.loggedIn) {
      console.log(data.value);
      data.resetForm();
      this.router.navigate(['/booking']);
    } else {
      throw 'Sisäänkirjautuminen epäonnistui';
    }
  }

}
