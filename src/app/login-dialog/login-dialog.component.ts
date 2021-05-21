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

  //nämä auth-serviceen?
  signIn(): void {
    this.router.navigate(['/sign-in']);
    this.dialog.closeAll();
  }

  logIn(data: NgForm): void {
    this.auth.signIn(data.value.sahkoposti, data.value.salasana);
    data.resetForm();
  }
}
