import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/app'; //tutorialissa auth
import User from './user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: any;
  user: User;
  errorMessage: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    private store: AngularFirestore,
    public router: Router,

    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.user = {
      id: '',
      name: '',
      email: '',
    };
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

  // laukaisee virheilmoituksen väärästä käyttäjätunnuksesta tai salasanasta
  openAlert() {
    this.errorMessage = true;
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
          email: userData.user!.email,
        };
      })
      .then(() => {
        console.log(this.user);
        this.router.navigate(['booking']);
        this.dialog.closeAll();
      })
      .catch((error) => {
        this.openAlert();
        console.log(error.message);
      });
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

  doGoogleLogin() {
    //return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.auth.signInWithPopup(provider).then((userData) => {
      this.router.navigate(['booking']);
      //resolve(userData);
      this.user = {
        id: userData.user!.uid,
        name: userData.user!.displayName,
        email: userData.user!.email,
      };
      console.log(userData.user!.displayName);
    });
  } //);
  //}
  //
}
