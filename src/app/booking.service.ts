import { identifierModuleUrl, NodeWithI18n } from '@angular/compiler';
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

  constructor(
    private store: AngularFirestore,
    private auth: AuthService,
    private cache: CacheService
  ) {
    this.users;
    this.allData;
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
          .where('id', '==', this.auth.user!.id)
          .where(
            'date',
            '>=',
            new Date().toLocaleDateString('en-GB').split('.').toString()
          )
      )
      .snapshotChanges()
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

  formatBookingDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  // getOldBookings(date: Date) {
  //   return this.store.collection('Bookings', (ref) =>
  //     ref.where('date', '<=', date).get()
  //   );
  // }
}
