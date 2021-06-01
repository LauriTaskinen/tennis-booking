import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from '../auth.service';
import { LocalstorageService } from '../localstorage.service';
// import { LoginData } from '../logindata'; // otetaan sisään testikäyttäjän tunnnus ja salasana

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  image = '../assets/tennis.jpg';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public auth: AuthService,
    public localstorage: LocalstorageService
  ) {}

  /*kun käyttäjä kirjautuu googlella, sisäänkirjautuessa
  hänet ohjataan takaisin etusivulle, jotta hänen tietonsa
  (nimi, sähköposti, id) saadaan talteen. Booking-guard ei 
  salli pääsyä muille sivuille muuten.  */
  ngOnInit(): void {
    this.auth.saveGoogleUser();
  }

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  goToBooking() {
    this.router.navigate(['booking']);
  }
}
