import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// import firebase from 'firebase/app'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean;
  user: any;

  constructor(
    private auth: AngularFireAuth,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.loggedIn = false;
    this.user = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('there is user');
        return true;
      } else {
        console.log('no user');
        return false;
      }
    });
  }


  signUp(name:string, email: string, password: string): void {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => 
        userData.user?.updateProfile({
          displayName: name,
        }))
      .catch((error) => {
        console.log(error.message);
      });
  }

  signIn(email: string, password: string): void {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => (this.user = userData.user))
      .then(() => {
        console.log( this.user);
        this.router.navigate(['booking']);
        this.dialog.closeAll();
      });
  }

  signOut(): void {
    this.auth
      .signOut()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
