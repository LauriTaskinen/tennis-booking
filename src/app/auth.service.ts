import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from './cache.service';
import firebase from 'firebase/app';
import User from './user';
import { Observable } from 'rxjs';
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
  userState: Promise<any> | null;
  user: User | null;
  errorMessage: boolean = false;
  // user: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private cache: CacheService,
    private store: AngularFirestore
  ) {
    // this.user = this.auth.authState.pipe(
    //   switchMap((user) => {
    //     if (user) {
    //       return this.store.doc<any>(`bookings/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
    this.user = {
      id: '',
      name: '',
      email: '',
    };
    this.userState = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.reload());
      } else {
        console.log('no user');
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
      .then((userData) => {
        userData.user?.updateProfile({
          displayName: name,
        });
        let userInfo: User = {
          id: userData.user!.uid,
          name: name,
          email: email,
          //phone: phone,
        };
        this.updateUser(userInfo.id, userInfo);
      })
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
      .then((user: User) => {
        this.store.collection('Users').doc(user.id).set(user);
        console.log(user);
        this.cache.saveUser(user);
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

  doGoogleLogin() {
    //return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');

    return this.auth
      .signInWithPopup(provider)
      .then((userData) => {
        return (this.user = {
          id: userData.user!.uid,
          name: userData.user!.displayName,
          email: userData.user!.email,
        });
      })
      .then((user) => {
        this.updateUser(this.user!.id, this.user!);
        this.cache.saveUser(user);
        this.router.navigate(['booking']);
        this.dialog.closeAll();
        console.log(this.user!.id);
      })
      .catch((error) => console.log(error));
  }

  updateUser(userID: string, userInfo: User) {
    this.store
      .collection('Users')
      .doc(userID)
      .set(userInfo)
      .catch((error) => console.log(error));
  }
}

//this.router.navigate(['booking']);
//resolve(userData);
