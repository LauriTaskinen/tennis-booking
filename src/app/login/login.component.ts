import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from '../auth.service';
// import { LoginData } from '../logindata'; // otetaan sisään testikäyttäjän tunnnus ja salasana

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.saveGoogleUser();
  }

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}
