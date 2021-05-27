import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private store: AngularFirestore, private auth: AuthService, private cache: CacheService) {}

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
      .collection('Bookings', (ref) => ref.where('id', '==', this.cache.getItem('currentUserID')))
      .snapshotChanges();
  }

  getAllBookings() {
    return this.store.collection('Bookings').snapshotChanges();
  }

  deleteBooking(id: string): void {
    this.store
      .collection('Bookings')
      .doc(id)
      .delete()
      .catch((error) => console.log(error));
  }

  formatBookingDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }
  // getOldBookings(date: Date) {
  //   return this.store.collection('Bookings', (ref) =>
  //     ref.where('date', '<=', date).get()
  //   );
  // }
}
