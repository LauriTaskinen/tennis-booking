import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  users: any;
  allData: any;
  currentDate: string;
  currentUser: string | void;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService,
    private cache: CacheService
  ) {
    this.users;
    this.allData;
    this.currentDate = this.formatBookingDate(new Date().toLocaleDateString('en-US'));
    this.currentUser = this.cache.currentUserID;
  }

  //https://softauthor.com/firebase-get-user-data-by-uid/
  createBooking(info: object): Promise<any> {
    return (
      this.store
        .collection('Bookings')
        .add(info)
        //errorin näyttö näytöllä lisättävä
        .catch((error) => console.log(error))
    );
  }

  // hakee käyttäjän varaukset tietokannasta
  getPersonalBookings(): Observable<any> {
    return this.store
      .collection('Bookings', (ref) =>
        ref
          .where('id', '==', this.currentUser)
          .where(
            'date',
            '>=',
            new Date().toLocaleDateString('en-US').toString()
          )
      )
      .snapshotChanges();
  }

  getAllBookings() {
    return this.store.collection('Bookings').snapshotChanges();
  }

  getUsers() {
    return this.store.collection('Users').snapshotChanges();
  }

  deleteBooking(id: string): void {
    this.store
      .collection('Bookings')
      .doc(id)
      .delete()
      .catch((error) => console.log(error));
  }

  formatBookingDate(date: string ): string {
    const day = date.substring(date.indexOf('/')+1, date.lastIndexOf('/'));
    const month = date.substring(0, date.indexOf('/'));
    const year = date.substring(date.lastIndexOf('/'), 9);
    return `${day}/${month}${year}`
  }
  // getOldBookings(date: Date) {
  //   return this.store.collection('Bookings', (ref) =>
  //     ref.where('date', '<=', date).get()
  //   );
  // }
}
