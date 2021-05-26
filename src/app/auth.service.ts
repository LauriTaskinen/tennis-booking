import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/app';
import User from './user';

// import firebase from 'firebase/app'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: any;
  user: User;

  constructor(
    private auth: AngularFireAuth,
    public router: Router,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.user ={
      id: '',
      name: '',
      email: '',
    }
    this.userState = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('there is user');
        return true;
      } else {
        console.log('no user');
        return false;
      }
    });
  }

  googleAuth() {
    return this.googleLogin(new firebase.auth.GoogleAuthProvider());
  }

  googleLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then(() => {
        console.log('Sisäänkirjautuminen onnistui');
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  }

  signUp(name: string, email: string, password: string): void {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) =>
        userData.user?.updateProfile({
          displayName: name,
        })
      )
      .then(() =>
        this.snackbar.open(
          'Rekisteröinti onnistui! Voit nyt kirjautua sisään.',
          'sulje',
          { duration: 3000 }
        )
      )
      .catch((error) => {
        console.log(error.message);
        //huono snackbar
        this.snackbar.open('Rekisteröinti epäonnistui', 'sulje', {
          duration: 3000,
        });
      });
  }

  logIn(email: string, password: string): void {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.user = {
          id: userData.user!.uid,
          name: userData.user!.displayName,
          email: userData.user!.email
        };
      })
      .then(() => {
        console.log(this.user);
        this.router.navigate(['booking']);
        this.dialog.closeAll();
      })
      .catch((error) => console.log(error.message));
  }

  logOut(): void {
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
