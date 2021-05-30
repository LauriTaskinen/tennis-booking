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
    public auth: AngularFireAuth,
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
        // user.reload();
        // console.log('user refresh')
      } else {
        console.log('no user');
      }
    });

  }

  // laukaisee virheilmoituksen väärästä käyttäjätunnuksesta tai salasanasta
  openAlert() {
    this.errorMessage = true;
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return (
      this.auth.currentUser
        .then((user) => {
          this.router.navigate(['login']);
          return user!.sendEmailVerification();
        })
        // .then(()=>)//Dialog? snackbar?
        .catch((error) => console.log(error))
    );
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
      .then(() => {
        this.snackbar.open(
          'Rekisteröinti onnistui! Vahvista vielä sähköpostiosoitteesi ja kirjaudu sisään.',
          'sulje',
          { duration: 5000 }
        );
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error.message);
        this.snackbar.open(
          'Rekisteröinti epäonnistui. Yritä uudelleen.',
          'sulje',
          {
            duration: 4000,
          }
        );
      })
      .finally(() => this.SendVerificationMail());
  }

  logIn(email: string, password: string): void {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        if (!userData.user?.emailVerified) {
          this.SendVerificationMail();
          window.alert(
            'Melkein valmista! Käy vielä vahvistamassa sähköpostiosoitteesi ennen kirjautumista'
          );
          throw new Error('Email verification missing');
        }
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

  GoogleLogin() {
    //return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
    // provider.addScope('profile');
    // provider.addScope('email');
  }

  saveGoogleUser(): void {
    firebase
      .auth()
      .getRedirectResult()
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
        this.dialog.closeAll();
        console.log(this.user!.id);
      })
      .catch((error) => {
        this.router.navigate(['login']);
        console.log(error);
      });
  }

  updateUser(userID: string, userInfo: User) {
    this.store
      .collection('Users')
      .doc(userID)
      .set(userInfo)
      .catch((error) => console.log(error));
  }

  // validUser(userID: any): boolean {
  //   let isValid = false;
  //   if (typeof userID === 'string' && userID.length > 10) {
  //     this.store
  //       .collection('Users')
  //       .doc(userID)
  //       .snapshotChanges()
  //       .subscribe((user) => {
  //         user.payload.id === userID ? (isValid = true) : (isValid = false);
  //       });
  //   }
  //   console.log(isValid)
  //   return isValid;
  // }
}

//this.router.navigate(['booking']);
//resolve(userData);
