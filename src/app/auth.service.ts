import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from './cache.service';
import firebase from 'firebase/app';
import User from './user';
import { Observable } from 'rxjs';

// import firebase from 'firebase/app'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: any;
  UserData: Observable<any>
  user: User | undefined;
  errorMessage: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private cache: CacheService
  ) {
    this.UserData = this.auth.authState
    // this.userState = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // this.user!.id = user.uid;
    //     // this.user!.name = user.displayName;
    //     // this.user!.email = user.email;
    //     console.log('there is user');
    //     return true;
    //   } else {
    //     console.log('no user');
    //     return false;
    //   }
    // });
  }

  // laukaisee virheilmoituksen väärästä käyttäjätunnuksesta tai salasanasta

  openAlert() {
    this.errorMessage = true;
  }

  // Kirjautuminen Googlen -tunniksilla
  googleAuth() {
    return this.googleLogin(new firebase.auth.GoogleAuthProvider());
  }

  googleLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log('Sisäänkirjautuminen onnistui');
      })
      .then(() => {
        console.log(this.user);
        this.router.navigate(['booking']);
        this.dialog.closeAll();
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
        this.snackbar.open('Rekisteröinti epäonnistui', 'sulje', {
          duration: 3000,
        });
      });
  }

  logIn(email: string, password: string): void {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        return (this.user = {
          id: userData.user!.uid,
          name: userData.user!.displayName,
          email: userData.user!.email,
        });
      })
      .then((user) => {
        console.log(user);
        this.cache.save(user);
        this.router.navigate(['booking']);
        this.dialog.closeAll();
      })
      .catch(() => {
        this.openAlert();
      });
  }

  logOut(): void {
    this.auth
      .signOut()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['login']);
        this.cache.remove();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
