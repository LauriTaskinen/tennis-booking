import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  signIn(): void {
    this.router.navigate(['/sign-in']);
    this.dialog.closeAll();
  }

  logIn(data: NgForm): void {
    if (this.auth.loggedIn) {
      console.log(data.value);
      data.resetForm();
      this.router.navigate(['/booking']);
      this.dialog.closeAll();
    } else {
      throw 'Sisäänkirjautuminen epäonnistui';
    }
  }
}
