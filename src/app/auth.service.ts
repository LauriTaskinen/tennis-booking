import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from './localstorage.service';
import firebase from 'firebase/app';
import User from './user';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: Promise<any> | null;
  user: User | null;
  errorMessage: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private localstorage: LocalstorageService,
    private store: AngularFirestore
  ) {
    this.user = {
      id: '',
      name: '',
      email: '',
    };
    this.userState = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        };
      } else {
        console.log('no user');
      }
    });
  }

  // laukaisee virheilmoituksen väärästä käyttäjätunnuksesta tai salasanasta
  openAlert() {
    this.errorMessage = true;
  }

  // Lähettää sähköpostiin vahvistusviestin
  // apukirjastona käytetty https://www.positronx.io/send-verification-email-new-user-firebase-angular/
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
  // Unohtuneen salasanan nollaus
  // apukirjastona käytetty https://gist.github.com/codediodeio/3e3b5f5c3a2144702d009fd8cd510dbd
  ForgotPassword(passwordResetEmail: any) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.router.navigate(['login']);
        this.snackbar.open(
          'Linkki salasanan palauttamiseen on lähetetty sähköpostiisi, tarkistathan postilaatikkosi.'
        );
      })
      .catch(() => {
        this.snackbar.open(
          'Virhe on tapahtunut. Yritä myöhemmin uudestaan.',
          '',
          { duration: 4000 }
        );
      });
  }

  signUp(name: string, email: string, password: string): void {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        userData.user?.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        this.snackbar.open(
          'Rekisteröinti onnistui! Vahvista vielä sähköpostiosoitteesi ja kirjaudu sisään.',
          '',
          { duration: 5000, panelClass: 'success' }
        );
      })
      .catch((error) => {
        console.log(error.message);
        this.snackbar.open(
          'Rekisteröinti epäonnistui. Tiedoissa puutteita.',
          '',
          {
            duration: 4000,
            panelClass: 'error-message',
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
        this.localstorage.saveUser(user);
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
        this.localstorage.remove();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // Sisäänkirjautuminen Google-tunnuksilla
  // apukirjastona käytetty https://www.positronx.io/angular-firebase-google-login-auth-system-tutorial/
  GoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
  }

  /*Ensin authentikoidaan käyttäjä googlen ja firebasen avulla. Otetaan
    tiedot sovelluksen käytettäviksi ja tallennetaan sitten vielä välimuistiin.
    Virheenkäsittelyä ei ole, koska google-käyttäjää etsitään aina etusivulle tultaessa.
    Turhia virheitä olisi siis liikaa.*/
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
        console.log(user);
        this.updateUser(this.user!.id, this.user!);
        this.localstorage.saveUser(user);
        this.dialog.closeAll();
      });
  }

  /*päivittää käyttäjän tiedot tietokantaan. Google-authentikaation toiminnan vuoksi
    koettiin helpommaksi päivittää käyttäjän tiedot aina kirjautuessa, koska emme tiedä
    onko käyttäjä uusi vai ei*/
  updateUser(userID: string, userInfo: User) {
    this.store
      .collection('Users')
      .doc(userID)
      .set(userInfo)
      .catch((error) => console.log(error));
  }
}
